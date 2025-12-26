-- V3__migrate_uuid_to_int.sql
-- 1) Asegurar extensión UUID
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2) Añadir columnas temporales integer
ALTER TABLE users  ADD COLUMN id_int integer;
ALTER TABLE habits ADD COLUMN id_int integer;
ALTER TABLE habits ADD COLUMN user_id_int integer;

-- 3) Rellenar id_int en users con números secuenciales (determinista por orden de UUID)
WITH ordered_users AS (
    SELECT id, row_number() OVER (ORDER BY id) AS rn
    FROM users
)
UPDATE users
SET id_int = ordered_users.rn
    FROM ordered_users
WHERE users.id = ordered_users.id;

-- 4) Rellenar id_int en habits con números secuenciales (determinista por orden de UUID)
WITH ordered_habits AS (
    SELECT id, row_number() OVER (ORDER BY id) AS rn
    FROM habits
)
UPDATE habits
SET id_int = ordered_habits.rn
    FROM ordered_habits
WHERE habits.id = ordered_habits.id;

-- 5) Rellenar user_id_int en habits usando la correspondencia users.id -> users.id_int
UPDATE habits
SET user_id_int = u.id_int
    FROM users u
WHERE habits.user_id = u.id;

-- 6) Crear secuencias para las nuevas PKs
CREATE SEQUENCE users_id_seq;
CREATE SEQUENCE habits_id_seq;

-- 7) Asegurar que las columnas temporales no sean nulas (si hay filas sin correspondencia, revisa antes)
ALTER TABLE users  ALTER COLUMN id_int SET NOT NULL;
ALTER TABLE habits ALTER COLUMN id_int SET NOT NULL;
ALTER TABLE habits ALTER COLUMN user_id_int SET NOT NULL;

-- 8) Eliminar FK existente en habits (nombre conocido: fk_habits_user)
ALTER TABLE habits DROP CONSTRAINT IF EXISTS fk_habits_user;

-- 9) Eliminar PKs actuales (nombres estándar: users_pkey, habits_pkey)
ALTER TABLE users  DROP CONSTRAINT IF EXISTS users_pkey;
ALTER TABLE habits DROP CONSTRAINT IF EXISTS habits_pkey;

-- 10) Eliminar columnas UUID antiguas
ALTER TABLE habits DROP COLUMN IF EXISTS user_id;
ALTER TABLE habits DROP COLUMN IF EXISTS id;
ALTER TABLE users  DROP COLUMN IF EXISTS id;

-- 11) Renombrar columnas temporales a los nombres finales
ALTER TABLE users  RENAME COLUMN id_int TO id;
ALTER TABLE habits RENAME COLUMN id_int TO id;
ALTER TABLE habits RENAME COLUMN user_id_int TO user_id;

-- 12) Establecer ownership de secuencias y defaults para autoincrement
ALTER SEQUENCE users_id_seq OWNED BY users.id;
ALTER SEQUENCE habits_id_seq OWNED BY habits.id;

ALTER TABLE users  ALTER COLUMN id SET DEFAULT nextval('users_id_seq');
ALTER TABLE habits ALTER COLUMN id SET DEFAULT nextval('habits_id_seq');

-- 13) Crear PKs y FK con los nuevos tipos integer
ALTER TABLE users  ADD CONSTRAINT users_pkey PRIMARY KEY (id);
ALTER TABLE habits ADD CONSTRAINT habits_pkey PRIMARY KEY (id);

ALTER TABLE habits
    ADD CONSTRAINT fk_habits_user FOREIGN KEY (user_id)
        REFERENCES users (id) ON DELETE CASCADE;

-- 14) Ajustar secuencias para que empiecen después del máximo actual
SELECT setval('users_id_seq', COALESCE((SELECT MAX(id) FROM users), 1));
SELECT setval('habits_id_seq', COALESCE((SELECT MAX(id) FROM habits), 1));
