"use client";

import { useEffect, useState } from 'react'

export default function Extension() {
  const [lightDie, setLightDie] = useState<number | null>(null)
  const [darkDie, setDarkDie] = useState<number | null>(null)

  const rollDie = () => Math.ceil(Math.random() * 6)

  const rollDuality = () => {
    setLightDie(rollDie())
    setDarkDie(rollDie())
  }

  const dominant = () => {
    if (lightDie === null || darkDie === null) return null
    if (lightDie > darkDie) return 'Light'
    if (darkDie > lightDie) return 'Dark'
    return 'Dark (tie)'
  }

  return (
    <main style={{ padding: 24, fontFamily: 'sans-serif' }}>
      <h1>Daggerheart Toolkit</h1>

      <section>
        <h2>Duality Dice</h2>
        <button onClick={rollDuality}>Roll Duality</button>
        <p>Light Die: {lightDie}</p>
        <p>Dark Die: {darkDie}</p>
        {dominant() && <p>Dominant: <strong>{dominant()}</strong></p>}
      </section>
    </main>
  )
}