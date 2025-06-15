SELECT
  s.timestamp as "session_date",
  TRUNC((DATE_PART('day',DATE_TRUNC('day', s."timestamp")::TIMESTAMP - '2025-03-07'::TIMESTAMP) / 7) + 1)::INT as "session_week",
  u.name as "user_name",
  u.phone as "user_phone",
  u.sign_up_week as "user_weekly_cohort",
  s.chat_history,
  u.token as "user_token"
FROM
  session s
  inner join users_with_sign_up_week_view u using ("token")
where
  1 = 1
  and u.sign_up_week = 2