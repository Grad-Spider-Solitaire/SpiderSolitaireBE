--changeset luke:ddl:alterTableWithEmail:users
ALTER TABLE users
ADD COLUMN email VARCHAR(100) UNIQUE;
--rollback ALTER TABLE users DROP COLUMN email;


