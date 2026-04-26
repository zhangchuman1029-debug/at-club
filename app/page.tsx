// app/page.tsx
import { db } from '../lib/db'
import { Player } from '@prisma/client'
import * as motion from "framer-motion/client"

/**
 * 球员卡片组件
 * A&T 浅色呼吸感设计
 */
function PlayerCard({ player }: { player: Player }) {
  return (
    <motion.div
      whileHover={{ y: -15 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative bg-white border border-slate-100 p-12 aspect-[3/4.2] flex flex-col justify-end shadow-[0_20px_50px_rgba(0,0,0,0.02)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.06)] transition-all duration-500"
    >
      {/* 背景装饰数字 */}
      <div className="absolute top-0 right-0 p-6 overflow-hidden">
        <span className="text-7xl font-black text-slate-50 group-hover:text-orange-50/50 transition-colors duration-500 block transform translate-x-4 -translate-y-2">
          {player.number.padStart(2, '0')}
        </span>
      </div>

      <div className="relative z-10">
        {player.isFounder && (
          <span className="inline-block px-3 py-1 bg-slate-900 text-white text-[8px] font-bold tracking-[0.2em] uppercase mb-6">
            Founder / Leader
          </span>
        )}

        <p className="text-orange-500 font-mono text-[10px] mb-2 tracking-[0.4em] uppercase font-bold">
          {player.position}
        </p>

        <h4 className="text-4xl font-black mb-6 text-slate-900 tracking-tighter uppercase italic">
          {player.name}
        </h4>

        <div className="h-[1px] w-8 bg-slate-100 mb-6 group-hover:w-16 transition-all duration-500"></div>

        <p className="text-slate-400 text-xs leading-loose font-light italic">
          "{player.quote || "Keep flying, keep fighting."}"
        </p>
      </div>
    </motion.div>
  )
}

/**
 * 首页主组件 (Server Component)
 */
export default async function Home() {
  const players = await db.player.findMany({
    orderBy: { id: 'asc' }
  })

  return (
    <main className="bg-[#f8fafc] text-slate-900 min-h-screen font-sans selection:bg-orange-100 selection:text-orange-600">

      {/* 极简导航 */}
      <nav className="fixed top-0 w-full z-50 flex justify-between items-center px-10 py-8 mix-blend-difference">
        <div className="font-black italic text-2xl tracking-[0.2em] text-white">
          A&T<span className="text-orange-500">.</span>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="h-screen flex flex-col justify-center items-center relative px-4">
        <div className="text-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-orange-500 font-mono tracking-[0.8em] mb-6 text-[10px] uppercase font-bold"
          >
            Est. 2026 / Hong Kong
          </motion.p>

          <h1 className="text-6xl md:text-[9rem] font-black italic uppercase leading-[0.8] tracking-[-0.06em]">
            <span className="block text-slate-900">Ambition</span>
            <span className="block text-slate-300">Together</span>
          </h1>
        </div>

        {/* 装饰线条 */}
        <div className="absolute bottom-0 right-10 h-32 w-[1px] bg-gradient-to-b from-transparent to-slate-200"></div>
      </section>

      {/* Roster Section */}
      <section id="roster" className="py-40 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col items-start mb-32 space-y-4">
          <h3 className="text-slate-400 text-[10px] font-bold tracking-[0.6em] uppercase">/ The Roster</h3>
          <h2 className="text-5xl font-black italic tracking-tighter">THE FLIGHT CREW</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {players.length > 0 ? (
            players.map((player) => (
              <PlayerCard key={player.id} player={player} />
            ))
          ) : (
            <div className="col-span-full border border-dashed border-slate-200 py-20 text-center">
              <p className="text-slate-300 font-mono text-[10px] tracking-[0.4em] uppercase">
                Waiting for deployment in Prisma Studio...
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-slate-100 text-center">
        <p className="text-[9px] font-mono tracking-[0.5em] text-slate-300 uppercase">
          &copy; AntAirline Volleyball Club. Dev by Full-stack.
        </p>
      </footer>
    </main>
  )
}