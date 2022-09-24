import { useState, useEffect } from 'react';
import localStorage from 'local-storage';

export default function BpmInput({ bpm_type }) {
    const previous_bpm_state = localStorage.get(bpm_type) != null ? localStorage.get(bpm_type) : "80"

    const [bpm, setBpm] = useState(previous_bpm_state);

    useEffect(() => {
        localStorage.set(bpm_type, bpm)
    })

    return(
        <forum>
            <input 
            className="text-black m-2" 
            type="number" 
            step="1" 
            pattern="\d+" 
            min="60" 
            max="260" 
            value={bpm}
            onChange={(e) => setBpm(e.target.value)}></input>
        </forum>
    );
}