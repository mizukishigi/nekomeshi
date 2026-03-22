-- Function to get aggregated food statistics (callable by anon)
CREATE OR REPLACE FUNCTION get_public_food_stats(p_food_id UUID)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  result JSON;
BEGIN
  SELECT json_build_object(
    'total_logs', COUNT(*),
    'total_cats', COUNT(DISTINCT fl.cat_id),
    'avg_appetite', ROUND(AVG(fl.appetite_rating)::numeric, 1),
    'avg_stool', ROUND(AVG(fl.stool_condition)::numeric, 1),
    'vomit_count', COUNT(*) FILTER (WHERE fl.has_vomited = true),
    'breed_distribution', (
      SELECT json_agg(json_build_object('breed', breed, 'count', cnt))
      FROM (
        SELECT COALESCE(c.breed, '不明') as breed, COUNT(DISTINCT c.id) as cnt
        FROM cats c
        WHERE c.id IN (
          SELECT DISTINCT fl2.cat_id FROM feeding_logs fl2 WHERE fl2.food_id = p_food_id
        )
        GROUP BY COALESCE(c.breed, '不明')
        ORDER BY cnt DESC
      ) breeds
    )
  ) INTO result
  FROM feeding_logs fl
  WHERE fl.food_id = p_food_id;

  RETURN result;
END;
$$;

-- Grant execute to anon and authenticated roles
GRANT EXECUTE ON FUNCTION get_public_food_stats(UUID) TO anon;
GRANT EXECUTE ON FUNCTION get_public_food_stats(UUID) TO authenticated;

-- Function to get stats for all foods (for explore listing page)
CREATE OR REPLACE FUNCTION get_all_food_stats()
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  result JSON;
BEGIN
  SELECT json_agg(
    json_build_object(
      'food_id', food_id,
      'total_logs', total_logs,
      'total_cats', total_cats,
      'avg_appetite', avg_appetite
    )
  ) INTO result
  FROM (
    SELECT
      fl.food_id,
      COUNT(*) as total_logs,
      COUNT(DISTINCT fl.cat_id) as total_cats,
      ROUND(AVG(fl.appetite_rating)::numeric, 1) as avg_appetite
    FROM feeding_logs fl
    GROUP BY fl.food_id
    HAVING COUNT(*) >= 1
    ORDER BY COUNT(*) DESC
  ) stats;

  RETURN COALESCE(result, '[]'::json);
END;
$$;

GRANT EXECUTE ON FUNCTION get_all_food_stats() TO anon;
GRANT EXECUTE ON FUNCTION get_all_food_stats() TO authenticated;
