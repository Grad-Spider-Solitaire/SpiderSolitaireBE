--changeset derryk:dml:mockData:difficulty_levels
INSERT INTO difficulty_levels (name, suits) VALUES
('Easy', 4),
('Medium', 6),
('Hard', 8);
--rollback DELETE FROM "difficulty_levels";


--changeset luke:dml:removeMockData:difficulty_levels
DELETE FROM difficulty_levels ;


--changeset luke:dml:newMockData:difficulty_levels
INSERT INTO difficulty_levels (name, suits) VALUES
('Easy', 1),
('Medium', 2),
('Hard', 4);
--rollback DELETE FROM "difficulty_levels";