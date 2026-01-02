CREATE TABLE habit_logs (
                            id SERIAL PRIMARY KEY,
                            habit_id INTEGER NOT NULL,
                            date DATE NOT NULL,
                            completed BOOLEAN NOT NULL,
                            CONSTRAINT fk_habit
                                FOREIGN KEY (habit_id)
                                    REFERENCES habits(id)
                                    ON DELETE CASCADE,
                            CONSTRAINT uk_habit_date UNIQUE (habit_id, date)
);
