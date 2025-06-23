-- DROP MATERIALIZED VIEW session_daily_cohort_by_sign_up_week_materialized_view;
-- -- -- -- --
-- CREATE UNIQUE INDEX session_daily_cohort_by_sign_up_week_materialized_view_date_idx
-- ON session_daily_cohort_by_sign_up_week_materialized_view (date, user_sign_up_week_cohort);
-- -- -- -- --
CREATE MATERIALIZED VIEW session_daily_cohort_by_sign_up_week_materialized_view AS
SELECT
  s.session_day AS date,
  TRUNC((DATE_PART('day',s.session_day::TIMESTAMP - '2025-03-07'::TIMESTAMP) / 7) + 1)::INT as session_week,
  u.sign_up_week AS user_sign_up_week_cohort,
  COUNT(DISTINCT u.token) AS aggregated_user_count,
  COUNT(DISTINCT (CASE WHEN s.chat_jobs_response_count > 0 THEN u.token ELSE null END)) AS aggregated_jobs_active_user_count,
  COUNT(DISTINCT (CASE WHEN s.chat_baccalaureat_response_count > 0 THEN u.token ELSE null END)) AS aggregated_baccalaureat_active_user_count,
  COALESCE(SUM(chat_total_question_count), 0) AS aggregated_chat_total_question_count,
  COALESCE(SUM(chat_total_answer_count), 0) AS aggregated_chat_total_answer_count,
  COALESCE(SUM(chat_audio_answer_count), 0) AS aggregated_chat_audio_answer_count,
  COALESCE(SUM(chat_text_answer_count), 0) AS aggregated_chat_text_answer_count,
  COALESCE(SUM(chat_jobs_response_count), 0) AS aggregated_chat_jobs_response_count,
  COALESCE(SUM(chat_baccalaureat_response_count), 0) AS aggregated_chat_baccalaureat_response_count,
  COALESCE(SUM(chat_baccalaureat_missing_response_count), 0) AS aggregated_chat_baccalaureat_missing_response_count,
  COALESCE(SUM(chat_baccalaureat_response_with_answer_count), 0) AS aggregated_chat_baccalaureat_response_with_answer_count,
  COALESCE(SUM(chat_total_baccalaureat_count), 0) AS aggregated_chat_total_baccalaureat_count,
  COUNT(
    CASE
      WHEN chat_text_answer_with_source_count > 0 THEN 1
      ELSE null
    END
  ) AS aggregated_chat_text_answer_with_source_count
FROM
  session_with_chat_statistics_view s
  INNER JOIN users_with_sign_up_week_view u USING (token)
WHERE
  1 = 1
  AND s.chat_total_question_count IS NOT NULL
  AND s.chat_total_question_count > 0
GROUP BY
  s.session_day,
  u.sign_up_week
ORDER BY
  s.session_day DESC
