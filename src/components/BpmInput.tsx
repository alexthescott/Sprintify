import React, { PropsWithChildren, useState, useEffect, useRef } from 'react';
import { cacheCurrentBpm, getCurrentBPM } from '../utils/cache'

interface BPM {
    min: number
    max: number
}

interface Props extends PropsWithChildren {
    onChange?(bpm: BPM): void
}

let bpm = getCurrentBPM()

function BpmInput({ onChange }: Props) {
    const initialized = useRef(false)
    const min = useRef(bpm["min"])
    const max = useRef(bpm["max"])
    const [minBpm, setMinBpm] = useState<number>(min.current)
    const [maxBpm, setMaxBpm] = useState<number>(max.current)

    const handleBpmInput = (isMax: boolean, event: React.FormEvent<HTMLInputElement>) => {
        if (!isNaN(Number(event.currentTarget.value))) {
            const value = parseInt(event.currentTarget.value)
            if (isMax) {
                setMaxBpm(value)
            } else {
                setMinBpm(value)
            }
        }
    }

    const submitBpm = (isMax: boolean) => {
        if (isMax) {
            setMaxBpm(maxBpm)
        } else {
            setMinBpm(minBpm)
        }
        cacheCurrentBpm(maxBpm, minBpm)
        bpm = getCurrentBPM()
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

    return (
        <form className="object-center text-center">
            <div>
                <h1 className="text-2xl">Max BPM</h1>
                <input
                    className="peer/max m-2 p-2 invalid:border-pink-500 bg-black border-2 border-white rounded-lg text-center text-2xl"
                    type="number"
                    pattern="\d+"
                    min={Math.max(minBpm + 1, 60)}
                    max={260}
                    step={1}
                    value={maxBpm}
                    onInput={(e) => handleBpmInput(true, e)}
                    onBlur={() => submitBpm(true)}
                />
                <div className="mt-2 invisible peer-invalid/max:visible peer-invalid/max:animate-fade-in text-pink-600 text-sm -translate-y-1">
                    Enter a Max BPM below 260 and above Min BPM
                </div>
            </div>
            <div>
                <h1 className="text-2xl">Min BPM</h1>
                <input
                    className="peer/min mt-2 p-2 invalid:border-pink-500 bg-black border-2 border-white rounded-lg text-center text-2xl"
                    type="number"
                    pattern="\d+"
                    min={60}
                    max={Math.min(maxBpm - 1, 260)}
                    step={1}
                    value={minBpm}
                    onInput={(e) => handleBpmInput(false, e)}
                    onBlur={() => submitBpm(false)}
                />
                <div className="mt-2 invisible peer-invalid/min:visible peer-invalid/min:animate-fade-in text-pink-600 text-sm -translate-y-1">
                    Enter a Min BPM above 60 and below Max BPM
                </div>
            </div>
        </form>
    );
}

export type { BPM }

export default BpmInput