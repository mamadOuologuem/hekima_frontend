CREATE
OR REPLACE VIEW users_with_sign_up_week_view AS
SELECT
  u.*,
  CASE
    WHEN u.created IS NULL
    OR u.created < DATE '2025-03-07' THEN -1
    ELSE TRUNC(
      (
        DATE_PART(
          'day',
          created :: TIMESTAMP - '2025-03-07' :: TIMESTAMP
        ) / 7
      ) + 1
    ) :: INT
  END AS sign_up_week
FROM
  users u
