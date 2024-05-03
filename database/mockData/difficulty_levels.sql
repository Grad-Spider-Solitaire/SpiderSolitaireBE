--changeset derryk:dml:mockData:difficulty_levels
INSERT INTO difficulty_levels (name, suits) VALUES
('Easy', 4),
('Medium', 6),
('Hard', 8);
--rollback DELETE FROM "difficulty_levels";