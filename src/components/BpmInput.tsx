import React, { PropsWithChildren, useState, useEffect, useRef } from 'react';
import { cacheCurrentBpm, getCurrentBPM } from '../utils/cache'
import { BPM } from '../services/spotify/models'

interface Props extends PropsWithChildren {
    onChange?(bpm: BPM): void 
    min?: number
    max?: number
}
function BpmInput({ onChange }: Props) {
    const bpm = getCurrentBPM()
    const min = bpm["min"]
    const max = bpm["max"]
    const initialized = useRef(false)
    const [minBpm, setMinBpm] = useState<number>(min)
    const [maxBpm, setMaxBpm] = useState<number>(max)

    const handleBpmInput = (isMax: boolean, event: React.FormEvent<HTMLInputElement>) => {
        if (!isNaN(Number(event.currentTarget.value))){
            const value = parseInt(event.currentTarget.value)
            if (isMax) {
                setMaxBpm(value)
            } else {
                setMinBpm(value)
            }
        }
    }

    const submitBpm = (isMax: boolean) => {
        if(isNaN(maxBpm) || isNaN(minBpm)){
            const bpm = getCurrentBPM()
            const min = bpm["min"]
            const max = bpm["max"]
            setMaxBpm(max)
            setMinBpm(min)
            return
        } 

        if (isMax) {
            let bpm = maxBpm
            if (maxBpm < minBpm) {
                bpm = minBpm + 1
            }
            setMaxBpm(bpm)
            cacheCurrentBpm(bpm, minBpm)
        } else {
            let bpm = minBpm
            if (maxBpm < minBpm) {
                bpm = maxBpm - 1
            }
            setMinBpm(bpm)
            cacheCurrentBpm(maxBpm, bpm)
        }
        if (onChange === undefined) return

        onChange({
            max: maxBpm,
            min: minBpm
        })
    }

    useEffect(() => {
        if (!initialized.current && onChange !== undefined) {
            onChange({
                max: maxBpm,
                min: minBpm
            })
        }

        initialized.current = true
    }, [maxBpm, minBpm, onChange])


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
                    onInput={(e) => handleBpmInput(false, e)}
                    onBlur={() => submitBpm(false)}
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
                    onInput={(e) => handleBpmInput(true, e)}
                    onBlur={() => submitBpm(true)}
                />
            </div>
        </div>
    );
}

export default BpmInput