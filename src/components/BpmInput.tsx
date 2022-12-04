import React, { PropsWithChildren, useState, useEffect, useRef } from 'react';


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
    const initialized = useRef(false)
    const [minBpm, setMinBpm] = useState<number>(min)
    const [maxBpm, setMaxBpm] = useState<number>(max)

    const handleBpmInput = (isMax: boolean, event: React.FormEvent<HTMLInputElement>) => {
        const value = Number(event.currentTarget.value)

        if (isMax) {
            setMaxBpm(value)
        } else {
            setMinBpm(value)
        }
    }

    const submitBpm = (isMax: boolean) => {
        if (isMax) {
            let bpm = maxBpm
            if (maxBpm < minBpm) {
                bpm = minBpm
            }
            setMaxBpm(bpm)
        } else {
            let bpm = minBpm
            if (maxBpm < minBpm) {
                bpm = maxBpm
            }
            setMinBpm(bpm)
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

export type { Bpm }
export default BpmInput
