import React, { useState } from 'react';

interface Args{
    bpm_type: "min" | "max",
    default_bpm: number
}
function BpmInput({ bpm_type, default_bpm=100 }: Args) {
    // const previous_bpm_state = localStorage.get(bpm_type) != null ? localStorage.get(bpm_type) : default_bpm

    const [bpm, setBpm] = useState(100);

    // useEffect(() => {
    //     localStorage.setItem(bpm_type, bpm)
    // })

    // const handleBpmChange = (event: React.ChangeEvent) => {
    //     // limit the size of characters to 3, stop 0 from being the first value
    //     let value = event.nativeEvent.target.value
    //     if (value === null) return
        
    //     value = value.slice(0, 3)
    //     if (value[0] === "0") value = value.slice(1, 3)
    //     setBpm(value);
    // }

    // const limitBpmRange = (event: React.FocusEvent) => {
    //     // limit min of 60bpm and max of 260bpm
    //     // if we're min bpm, limit outselves to one below current max
    //     // if we're max bpm, limit outselves to one above current min
    //     let max = 260;
    //     let min = 60;
    //     if (bpm_type === "min_bpm") {
    //         max = Number(localStorage.get("max_bpm")) - 1
    //     } else {
    //         min = Number(localStorage.get("min_bpm")) + 1
    //     }
    //     const value = Math.max(min, Math.min(max, Number(event.target.value)))
    //     setBpm(value);
    // }

    return(
        <div>
            <input 
            className="m-2 p-2 bg-black border-2 border-white rounded-lg text-center text-2xl" 
            type="number" 
            step="1" 
            pattern="\d+" 
            min="60" 
            max="260" 
            maxLength={3}
            value={bpm}
            onChange={console.log}
            />
            {/* onChange={handleBpmChange}
            onBlur={limitBpmRange} /> */}
        </div>
    );
}

export default BpmInput
