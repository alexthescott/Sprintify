import BpmInput from '../BpmInput';

export default () => (
    <div className='object-center text-center'>
        <div>
            <h1 className='text-2xl'>Min BPM</h1>
            <BpmInput bpm_type={"min_bpm"} default_bpm={"100"}/>
        </div>
        <div className='p-3'/>
        <div>
            <h1 className='text-2xl'>Max BPM</h1>
            <BpmInput bpm_type={"max_bpm"} default_bpm={"120"} />
        </div>
    </div>
);