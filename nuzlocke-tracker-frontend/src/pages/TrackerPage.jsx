import { useEffect, useState } from 'react';
import axiosInstance from '../api/connector';
import RunList from '../components/RunList';
import Navbar from '../components/Navbar';
import { useAtom } from 'jotai';
import { currentRunAtom } from '../atoms';
import EncounterCard from '../components/EncounterCard';

const TrackerPage = () => {
    const [runs, setRuns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [, setCurrentRun] = useAtom(currentRunAtom);

    useEffect(() => {
        const fetchRuns = async () => {
            try {
                const res = await axiosInstance.get('/nuzlocke/runs');
                setRuns(res.data);
            } catch (err) {
                setError('Failed to load runs.');
            } finally {
                setLoading(false);
            }
        };

        fetchRuns();
    }, []);

    return (
        <>
            <Navbar />
            <RunList runs={runs} setRuns={setRuns} setCurrentRun={setCurrentRun} />
            {loading && <p>Loading runs...</p>}
            {error && <p className="text-red-500">{error}</p>}
        </>
    );
};

export default TrackerPage;