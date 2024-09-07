import { useEffect, useState } from 'react';
import { supabase } from './SupabaseClient';

const useChallenges = () => {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const { data, error } = await supabase
          .from('challenges')
          .select('*');


        if (error) throw error;

        setChallenges(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchChallenges();
  }, []);
  return { challenges, loading, error };
};

export default useChallenges;
