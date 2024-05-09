--changeset derryk:dml:mockData:difficulty_levels
INSERT INTO difficulty_levels (name, suits) VALUES
('Easy', 1),
('Medium', 2),
('Hard', 4);
--rollback DELETE FROM "difficulty_levels";

