CREATE
OR REPLACE VIEW session_with_chat_statistics_view AS (
  with preprocessed_session as (
    SELECT
      *,
      DATE_TRUNC('day', s."timestamp") as session_day,
      -- Overall statistics
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
      -- Feature-specific statistics: Job search
      (
        LENGTH(s.chat_history) - LENGTH(REPLACE(s.chat_history, 'matches: [{', ''))
      ) / LENGTH('matches: [{') as chat_jobs_response_count,
      -- Feature-specific statistics: Baccalaureat
      (
        LENGTH(s.chat_history) - LENGTH(
          REPLACE(s.chat_history, 'exam_questions_url: https', '')
        )
      ) / LENGTH('exam_questions_url: https') as chat_baccalaureat_response_count,
      (
        LENGTH(s.chat_history) - LENGTH(
          REPLACE(s.chat_history, 'exam_questions_url: null', '')
        )
      ) / LENGTH('exam_questions_url: null') as chat_baccalaureat_missing_response_count,
      (
        LENGTH(s.chat_history) - LENGTH(
          REPLACE(s.chat_history, 'exam_answers_url: https', '')
        )
      ) / LENGTH('exam_answers_url: https') as chat_baccalaureat_response_with_answer_count
    FROM
      session s
  )
  SELECT
    ps.*,
    (
      chat_text_answer_count + chat_audio_answer_count + chat_baccalaureat_response_count + chat_baccalaureat_missing_response_count
    ) as chat_total_answer_count,
    (
      chat_baccalaureat_response_count + chat_baccalaureat_missing_response_count
    ) as chat_total_baccalaureat_count
  FROM
    preprocessed_session ps
)
