CREATE
OR REPLACE VIEW session_with_chat_statistics_view AS (
  with preprocessed_session as (
    SELECT
      *,
      (
        LENGTH(s.chat_history) - LENGTH(REPLACE(s.chat_history, 'role: user', ''))
      ) / LENGTH('role: user') as chat_total_question_count,
      (
        LENGTH(s.chat_history) - LENGTH(REPLACE(s.chat_history, 'audio_url:', ''))
      ) / LENGTH('audio_url:') as chat_audio_answer_count,
      (
        LENGTH(s.chat_history) - LENGTH(REPLACE(s.chat_history, 'answer:', ''))
      ) / LENGTH('answer:') as chat_text_answer_count,
      (
        LENGTH(s.chat_history) - LENGTH(REPLACE(s.chat_history, '"title":', ''))
      ) / LENGTH('"title":') as chat_text_answer_with_source_count,
      DATE_TRUNC('day', s."timestamp") as session_day
    FROM
      session s
  )
  SELECT
    ps.*,
    (chat_text_answer_count + chat_audio_answer_count) as chat_total_answer_count
  FROM
    preprocessed_session ps
)
