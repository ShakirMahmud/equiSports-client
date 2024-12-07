import { useLocation } from 'react-router-dom';

const Loading = () => {
    const location = useLocation();
    return (
        <div className={`flex  justify-center items-center ${ location.pathname === '/' ? 'dark:bg-transparent max-h-screen' : 'dark:bg-slate-700 min-h-screen'} `}>
            <span className="loading loading-spinner text-primary"></span>
            <span className="loading loading-spinner text-secondary"></span>
            <span className="loading loading-spinner text-accent"></span>
            <span className="loading loading-spinner text-neutral"></span>
            <span className="loading loading-spinner text-info"></span>
            <span className="loading loading-spinner text-success"></span>
            <span className="loading loading-spinner text-warning"></span>
            <span className="loading loading-spinner text-error"></span>
        </div>
    );
};

export default Loading;