import BpmInput from '../BpmInput';

export default () => (
    <div className='object-center'>
        <div>
            <h1>Min BPM</h1>
            <BpmInput bpm_type={"min_bpm"}/>
        </div>
        <div>
            <h1>Max BPM</h1>
            <BpmInput bpm_type={"max_bpm"}/>
        </div>
    </div>
);