import React, { PropsWithChildren, useState, useEffect } from 'react';


interface Bpm {
    min: number
    max: number
}

interface Props extends PropsWithChildren {
    onChange?(bpm: Bpm): void 
    min?: number
    max?: number
}
function BpmInput({ onChange, min=60, max=260 }: Props) {
    const [minBpm, setMinBpm] = useState<number>(min)
    const [maxBpm, setMaxBpm] = useState<number>(max)

    const handleBpmChange = (isMax: boolean, event: any) => {
        let value = Number(event.target.value)

        if (isMax && value >= minBpm) {
            setMaxBpm(value)
        } else if (!isMax && value <= maxBpm) {
            setMinBpm(value)
        }
    }

    useEffect(() => {
        if (onChange === undefined) return

        onChange({
            max: maxBpm,
            min: minBpm
        })
    }, [minBpm, maxBpm])

    return(
        <div className="object-center text-center">
            <div>
                <h1 className="text-2xl">Min BPM</h1>
                <input
                    className="m-2 p-2 bg-black border-2 border-white rounded-lg text-center text-2xl"
                    type="number"
                    pattern="\d+"
                    min={min} 
                    max={max}
                    step={1}
                    value={minBpm}
                    onChange={(e) => handleBpmChange(false, e)}
                />
            </div>
            <div>
                <h1 className="text-2xl">Max BPM</h1>
                <input
                    className="m-2 p-2 bg-black border-2 border-white rounded-lg text-center text-2xl"
                    type="number"
                    pattern="\d+"
                    min={min}
                    max={max}
                    step={1}
                    value={maxBpm}
                    onChange={(e) => handleBpmChange(true, e)}
                />
            </div>
        </div>
    );
}

export default BpmInput
