--changeset derryk:dml:mockData:game_results
INSERT INTO game_results (user_id, score, difficulty_level_id, game_date, game_duration) VALUES
(1, 100, 1, '2024-05-03 10:00:00', '00:10:00'),
(2, 150, 2, '2024-05-03 11:00:00', '00:15:00'),
(3, 200, 3, '2024-05-03 12:00:00', '00:20:00');
--rollback DELETE FROM "game_results";