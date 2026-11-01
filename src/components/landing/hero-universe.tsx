"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Calculator,
  Check,
  FlaskConical,
  Music2,
  Palette,
  Sparkles,
} from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface FloatingProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  distance?: number;
  rotate?: number;
}

function Floating({
  children,
  className,
  delay = 0,
  duration = 7,
  distance = 8,
  rotate = 0,
}: FloatingProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      animate={
        reduceMotion
          ? undefined
          : { y: [0, -distance, 0], rotate: [0, rotate, 0] }
      }
      transition={{
        duration,
        delay,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
}

function SubjectChip({
  icon,
  label,
  tone,
}: {
  icon: ReactNode;
  label: string;
  tone: string;
}) {
  return (
    <div className="flex items-center gap-2 rounded-2xl border border-white/80 bg-white/85 p-1.5 pr-3 shadow-[0_16px_36px_-24px_rgba(30,24,58,0.5)] backdrop-blur-md">
      <span
        className={cn(
          "grid h-8 w-8 place-items-center rounded-xl text-white shadow-sm",
          tone,
        )}
      >
        {icon}
      </span>
      <span className="text-[0.7rem] font-semibold text-ink">{label}</span>
    </div>
  );
}

export function HeroUniverse() {
  const reduceMotion = useReducedMotion();

  return (
    <div
      className="relative mx-auto w-full max-w-[620px]"
      role="img"
      aria-label="An illustrated learning universe with floating islands, a glowing portal, a young explorer and subject worlds for mathematics, science, music and art."
    >
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 h-[78%] w-[86%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_50%_45%,rgba(255,255,255,0.95)_0%,rgba(221,213,255,0.75)_38%,rgba(190,226,241,0.3)_62%,transparent_76%)] blur-2xl"
      />
      <div
        aria-hidden="true"
        className="animate-shatra-drift absolute right-[2%] top-[6%] h-32 w-32 rounded-full bg-gold/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="animate-shatra-drift absolute bottom-[16%] left-[0%] h-36 w-36 rounded-full bg-sky/20 blur-3xl [animation-delay:2s]"
      />

      <svg
        viewBox="0 0 620 660"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10 h-auto w-full overflow-visible"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="portal-halo" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(310 300) rotate(90) scale(180)">
            <stop stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="0.48" stopColor="#d8ceff" stopOpacity="0.72" />
            <stop offset="0.78" stopColor="#b9e4f4" stopOpacity="0.24" />
            <stop offset="1" stopColor="#b9e4f4" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="portal-core" x1="238" y1="196" x2="392" y2="424" gradientUnits="userSpaceOnUse">
            <stop stopColor="#fffefb" />
            <stop offset="0.44" stopColor="#f0eaff" />
            <stop offset="0.76" stopColor="#cfeeff" />
            <stop offset="1" stopColor="#b8dff3" />
          </linearGradient>
          <linearGradient id="portal-inner" x1="250" y1="220" x2="380" y2="410" gradientUnits="userSpaceOnUse">
            <stop stopColor="#ffffff" stopOpacity="0.8" />
            <stop offset="0.55" stopColor="#d6c8ff" stopOpacity="0.55" />
            <stop offset="1" stopColor="#a5d9ef" stopOpacity="0.3" />
          </linearGradient>
          <linearGradient id="rock-left" x1="48" y1="382" x2="201" y2="448" gradientUnits="userSpaceOnUse">
            <stop stopColor="#6d5ca8" />
            <stop offset="0.55" stopColor="#58458f" />
            <stop offset="1" stopColor="#3f316e" />
          </linearGradient>
          <linearGradient id="rock-right" x1="424" y1="414" x2="568" y2="482" gradientUnits="userSpaceOnUse">
            <stop stopColor="#6f9dc0" />
            <stop offset="0.58" stopColor="#4f7c9f" />
            <stop offset="1" stopColor="#355b7a" />
          </linearGradient>
          <linearGradient id="grass-left" x1="47" y1="366" x2="202" y2="386" gradientUnits="userSpaceOnUse">
            <stop stopColor="#a9e6ce" />
            <stop offset="1" stopColor="#72c6aa" />
          </linearGradient>
          <linearGradient id="grass-right" x1="425" y1="401" x2="565" y2="420" gradientUnits="userSpaceOnUse">
            <stop stopColor="#c6e7f2" />
            <stop offset="1" stopColor="#8dc8dc" />
          </linearGradient>
          <linearGradient id="tree-crown" x1="100" y1="314" x2="160" y2="366" gradientUnits="userSpaceOnUse">
            <stop stopColor="#8bdcc0" />
            <stop offset="1" stopColor="#3d9b7e" />
          </linearGradient>
          <linearGradient id="gold-block" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#f6dea8" />
            <stop offset="1" stopColor="#d3a041" />
          </linearGradient>
          <linearGradient id="hoodie" x1="274" y1="500" x2="346" y2="576" gradientUnits="userSpaceOnUse">
            <stop stopColor="#8c7bf2" />
            <stop offset="1" stopColor="#5e4bc6" />
          </linearGradient>
          <linearGradient id="scarf" x1="276" y1="511" x2="344" y2="531" gradientUnits="userSpaceOnUse">
            <stop stopColor="#f5c56f" />
            <stop offset="1" stopColor="#dd8f50" />
          </linearGradient>
          <linearGradient id="book-cover" x1="352" y1="533" x2="400" y2="574" gradientUnits="userSpaceOnUse">
            <stop stopColor="#fdf8ea" />
            <stop offset="1" stopColor="#f0dfb6" />
          </linearGradient>
          <linearGradient id="companion" x1="430" y1="188" x2="492" y2="250" gradientUnits="userSpaceOnUse">
            <stop stopColor="#ffffff" />
            <stop offset="0.52" stopColor="#e7f6fb" />
            <stop offset="1" stopColor="#b9dfef" />
          </linearGradient>
          <filter id="portal-blur" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="14" />
          </filter>
          <filter id="soft-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <ellipse cx="310" cy="300" rx="238" ry="204" transform="rotate(-16 310 300)" stroke="rgba(120,103,232,0.26)" strokeWidth="1.2" strokeDasharray="3 9" />
        <ellipse cx="310" cy="306" rx="286" ry="144" transform="rotate(14 310 306)" stroke="rgba(110,184,219,0.28)" strokeWidth="1" strokeDasharray="2 8" />
        <ellipse cx="310" cy="312" rx="178" ry="232" transform="rotate(26 310 312)" stroke="rgba(211,160,65,0.2)" strokeWidth="1" strokeDasharray="2 10" />

        <motion.circle
          cx="310"
          cy="300"
          r="168"
          fill="url(#portal-halo)"
          animate={reduceMotion ? undefined : { opacity: [0.72, 0.95, 0.72], scale: [0.985, 1.015, 0.985] }}
          transition={{ duration: 7, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          style={{ transformOrigin: "310px 300px" }}
        />

        <circle cx="310" cy="300" r="148" stroke="rgba(255,255,255,0.85)" strokeWidth="1.4" strokeDasharray="1 8" />
        <circle cx="310" cy="300" r="134" stroke="rgba(120,103,232,0.18)" strokeWidth="1" />
        <ellipse cx="310" cy="300" rx="106" ry="128" fill="url(#portal-core)" stroke="rgba(255,255,255,0.9)" strokeWidth="2" />
        <path d="M244 352C246 264 260 220 310 209C360 220 374 264 376 352C346 366 274 366 244 352Z" fill="url(#portal-inner)" opacity="0.72" />
        <path d="M224 350C266 330 354 330 396 350C372 384 338 402 310 402C282 402 248 384 224 350Z" fill="rgba(255,255,255,0.34)" />
        <path d="M310 243L317 286L360 293L317 300L310 343L303 300L260 293L303 286L310 243Z" fill="url(#gold-block)" opacity="0.95" filter="url(#soft-glow)" />
        <circle cx="310" cy="293" r="6" fill="#fffdf7" />
        <circle cx="246" cy="266" r="3" fill="#d3a041" opacity="0.7" />
        <circle cx="372" cy="352" r="4" fill="#7867e8" opacity="0.55" />
        <circle cx="384" cy="230" r="2.5" fill="#6eb8db" opacity="0.75" />
        <circle cx="234" cy="336" r="2" fill="#ffffff" opacity="0.9" />

        <motion.g
          animate={reduceMotion ? undefined : { y: [0, -8, 0], rotate: [0, -1.2, 0] }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          style={{ transformOrigin: "122px 400px" }}
        >
          <ellipse cx="122" cy="382" rx="83" ry="21" fill="url(#grass-left)" />
          <path d="M39 381C54 409 86 430 120 430C158 430 190 408 205 380C186 392 157 398 127 398C90 398 62 392 39 381Z" fill="url(#rock-left)" />
          <path d="M68 396C84 412 101 418 122 418" stroke="rgba(255,255,255,0.14)" strokeWidth="2" strokeLinecap="round" />
          <path d="M139 409C154 404 171 393 185 383" stroke="rgba(255,255,255,0.12)" strokeWidth="2" strokeLinecap="round" />
          <path d="M112 358V327" stroke="#6b4f38" strokeWidth="6" strokeLinecap="round" />
          <circle cx="113" cy="315" r="25" fill="url(#tree-crown)" />
          <circle cx="94" cy="329" r="19" fill="#5cb99b" />
          <circle cx="134" cy="330" r="17" fill="#72caac" />
          <circle cx="118" cy="298" r="14" fill="#91e0c4" />
          <rect x="64" y="363" width="20" height="6" rx="2" fill="#f0cd83" stroke="#c99a3f" />
          <rect x="67" y="356" width="18" height="6" rx="2" fill="#fdf8ea" stroke="#d9c7a0" />
          <rect x="63" y="350" width="22" height="6" rx="2" fill="#d9cfff" stroke="#a894f3" />
          <rect x="150" y="360" width="6" height="22" rx="2" fill="#fdf8ea" opacity="0.9" />
          <path d="M153 359L165 364L153 369Z" fill="#ec8ba0" />
        </motion.g>

        <motion.g
          animate={reduceMotion ? undefined : { y: [0, -11, 0], rotate: [0, 1.2, 0] }}
          transition={{ duration: 9, delay: 0.7, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          style={{ transformOrigin: "496px 430px" }}
        >
          <ellipse cx="496" cy="417" rx="72" ry="18" fill="url(#grass-right)" />
          <path d="M424 415C438 441 466 459 496 459C529 459 555 441 568 414C551 425 525 431 498 431C466 431 441 425 424 415Z" fill="url(#rock-right)" />
          <path d="M455 425C471 438 486 444 505 443" stroke="rgba(255,255,255,0.16)" strokeWidth="2" strokeLinecap="round" />
          <path d="M512 450C529 445 544 434 556 423" stroke="rgba(255,255,255,0.12)" strokeWidth="2" strokeLinecap="round" />
          <path d="M482 402L482 364C482 356 488 350 496 350C504 350 510 356 510 364L510 402Z" fill="#fdf8ea" stroke="#cddbe4" />
          <path d="M475 364C475 349 484 339 496 339C508 339 517 349 517 364Z" fill="#8cc9dc" />
          <circle cx="496" cy="364" r="4" fill="#f0c978" />
          <path d="M486 393L486 375C486 370 490 366 496 366C502 366 506 370 506 375L506 393Z" fill="#e5f0f6" />
          <path d="M508 385L526 377" stroke="#c99a3f" strokeWidth="3" strokeLinecap="round" />
          <circle cx="528" cy="375" r="4" fill="#d3a041" />
          <path d="M496 339V327" stroke="#8ba8b9" strokeWidth="2" strokeLinecap="round" />
          <circle cx="496" cy="325" r="3" fill="#f0c978" />
          <circle cx="448" cy="399" r="9" fill="#b7dce9" />
          <circle cx="447" cy="398" r="3" fill="#ffffff" opacity="0.8" />
        </motion.g>

        <motion.g
          animate={reduceMotion ? undefined : { y: [0, -9, 0] }}
          transition={{ duration: 7.5, delay: 0.3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          style={{ transformOrigin: "420px 158px" }}
        >
          <path d="M374 159C396 150 440 150 464 161C443 184 393 183 374 159Z" fill="#d7eef7" />
          <path d="M374 159C393 164 442 165 464 161" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
          <rect x="398" y="128" width="44" height="30" rx="4" transform="rotate(-8 398 128)" fill="#fffaf0" stroke="#e4d4b1" />
          <path d="M420 131V156" stroke="#e4d4b1" strokeWidth="1.5" />
          <path d="M407 138H416M407 144H416M424 137H433M424 143H433" stroke="#cbb98f" strokeWidth="1.4" strokeLinecap="round" />
          <circle cx="459" cy="139" r="4" fill="#f0c978" />
          <path d="M458 127V117" stroke="#d3a041" strokeWidth="1.5" strokeLinecap="round" />
        </motion.g>

        <motion.g
          animate={reduceMotion ? undefined : { y: [0, -7, 0], rotate: [0, 2, 0] }}
          transition={{ duration: 6.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          style={{ transformOrigin: "465px 223px" }}
        >
          <circle cx="465" cy="223" r="36" fill="url(#companion)" stroke="rgba(255,255,255,0.9)" strokeWidth="2" />
          <circle cx="465" cy="223" r="45" stroke="rgba(110,184,219,0.35)" strokeWidth="1" strokeDasharray="2 6" />
          <circle cx="453" cy="220" r="3.2" fill="#2c245c" />
          <circle cx="477" cy="220" r="3.2" fill="#2c245c" />
          <path d="M456 233C462 238 469 238 475 233" stroke="#2c245c" strokeWidth="2" strokeLinecap="round" />
          <circle cx="447" cy="229" r="3.5" fill="#f3b7c4" opacity="0.75" />
          <circle cx="484" cy="229" r="3.5" fill="#f3b7c4" opacity="0.75" />
          <path d="M465 178V168" stroke="#6eb8db" strokeWidth="2" strokeLinecap="round" />
          <circle cx="465" cy="165" r="3" fill="#6eb8db" />
          <path d="M489 195L497 187" stroke="#d3a041" strokeWidth="2" strokeLinecap="round" />
        </motion.g>

        <motion.g
          animate={reduceMotion ? undefined : { y: [0, -6, 0] }}
          transition={{ duration: 5.8, delay: 0.4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          style={{ transformOrigin: "310px 546px" }}
        >
          <ellipse cx="310" cy="596" rx="72" ry="12" fill="rgba(63,49,110,0.13)" />
          <path d="M253 566C267 554 286 548 310 548C334 548 353 554 367 566C353 579 334 586 310 586C286 586 267 579 253 566Z" fill="#ffffff" opacity="0.9" />
          <path d="M270 564C283 556 296 552 310 552C324 552 337 556 350 564" stroke="#e7e1f5" strokeWidth="1.4" strokeLinecap="round" />

          <rect x="281" y="520" width="58" height="52" rx="18" fill="#6bb5d8" opacity="0.75" />
          <rect x="286" y="526" width="48" height="42" rx="14" fill="#8ecbe2" />
          <path d="M292 505C295 486 325 486 328 505L334 529C324 535 296 535 286 529L292 505Z" fill="url(#hoodie)" />
          <path d="M284 518C297 526 323 526 336 518L333 531C321 537 299 537 287 531L284 518Z" fill="url(#scarf)" />
          <path d="M318 529C326 537 332 546 331 556C326 556 319 551 315 543Z" fill="#ec9a52" />
          <circle cx="310" cy="479" r="27" fill="#f6c9a6" />
          <path d="M283 478C283 455 297 445 312 446C331 447 338 461 338 478C332 471 324 466 314 466C305 466 294 470 283 478Z" fill="#2c245c" />
          <path d="M283 478C280 489 283 498 289 502C288 490 289 481 294 475Z" fill="#2c245c" />
          <path d="M336 478C340 487 339 496 334 501C334 490 332 482 328 476Z" fill="#2c245c" />
          <circle cx="301" cy="483" r="2.6" fill="#2c245c" />
          <circle cx="320" cy="483" r="2.6" fill="#2c245c" />
          <circle cx="301" cy="482" r="0.9" fill="#ffffff" />
          <circle cx="320" cy="482" r="0.9" fill="#ffffff" />
          <path d="M305 492C309 495 314 495 318 492" stroke="#b15c48" strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="294" cy="489" r="3" fill="#efaab1" opacity="0.55" />
          <circle cx="327" cy="489" r="3" fill="#efaab1" opacity="0.55" />

          <path d="M335 535C344 535 351 541 351 549C351 556 345 561 338 561L332 549Z" fill="url(#hoodie)" />
          <path d="M347 548L370 539" stroke="#f6c9a6" strokeWidth="6" strokeLinecap="round" />
          <rect x="351" y="527" width="45" height="34" rx="5" transform="rotate(-10 351 527)" fill="url(#book-cover)" stroke="#dbc99f" strokeWidth="1.2" />
          <path d="M371 532L374 560" stroke="#dbc99f" strokeWidth="1.2" />
          <path d="M357 536L365 534M358 542L366 540M380 529L389 527M381 535L390 533" stroke="#c9b88f" strokeWidth="1.4" strokeLinecap="round" />
          <path d="M286 534C277 536 272 543 273 550C274 556 280 561 286 559L289 548Z" fill="url(#hoodie)" />
          <path d="M272 551L255 544" stroke="#f6c9a6" strokeWidth="6" strokeLinecap="round" />
          <rect x="280" y="552" width="14" height="27" rx="6" fill="#433773" />
          <rect x="326" y="552" width="14" height="27" rx="6" fill="#433773" />
          <rect x="274" y="574" width="24" height="10" rx="5" fill="#fdf8ea" stroke="#d9cbb0" />
          <rect x="322" y="574" width="24" height="10" rx="5" fill="#fdf8ea" stroke="#d9cbb0" />
        </motion.g>

        <motion.circle
          cx="202"
          cy="230"
          r="3"
          fill="#d3a041"
          animate={reduceMotion ? undefined : { opacity: [0.25, 0.9, 0.25] }}
          transition={{ duration: 3.6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
        <motion.circle
          cx="410"
          cy="152"
          r="2.5"
          fill="#7867e8"
          animate={reduceMotion ? undefined : { opacity: [0.3, 0.85, 0.3] }}
          transition={{ duration: 4.4, delay: 1, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
        <motion.circle
          cx="555"
          cy="300"
          r="3.5"
          fill="#6eb8db"
          animate={reduceMotion ? undefined : { opacity: [0.25, 0.9, 0.25] }}
          transition={{ duration: 5, delay: 0.6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
        <motion.circle
          cx="140"
          cy="510"
          r="2.5"
          fill="#e98757"
          animate={reduceMotion ? undefined : { opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 4.8, delay: 1.8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
      </svg>

      <Floating
        className="absolute left-[-2%] top-[31%] z-20 hidden sm:block"
        delay={0.2}
        distance={7}
        duration={6.5}
        rotate={-1}
      >
        <SubjectChip
          icon={<Calculator className="h-4 w-4" strokeWidth={1.9} />}
          label="Mathematics"
          tone="bg-violet"
        />
      </Floating>

      <Floating
        className="absolute right-[-3%] top-[24%] z-20 hidden md:block"
        delay={1.1}
        distance={9}
        duration={7.5}
        rotate={1}
      >
        <SubjectChip
          icon={<FlaskConical className="h-4 w-4" strokeWidth={1.9} />}
          label="Science"
          tone="bg-mint"
        />
      </Floating>

      <Floating
        className="absolute bottom-[21%] left-[1%] z-20 hidden sm:block"
        delay={1.7}
        distance={6}
        duration={6}
        rotate={1}
      >
        <SubjectChip
          icon={<Music2 className="h-4 w-4" strokeWidth={1.9} />}
          label="Music"
          tone="bg-gold"
        />
      </Floating>

      <Floating
        className="absolute bottom-[16%] right-[2%] z-20 hidden lg:block"
        delay={0.8}
        distance={8}
        duration={7}
        rotate={-1}
      >
        <SubjectChip
          icon={<Palette className="h-4 w-4" strokeWidth={1.9} />}
          label="Art"
          tone="bg-blush"
        />
      </Floating>

      <Floating
        className="absolute right-[-1%] top-[3%] z-20 hidden sm:block"
        delay={0.5}
        distance={6}
        duration={6.8}
        rotate={1.5}
      >
        <div className="w-[150px] rounded-2xl border border-white/80 bg-white/90 p-3 shadow-[0_22px_48px_-28px_rgba(30,24,58,0.55)] backdrop-blur-md">
          <div className="flex items-center gap-2.5">
            <span className="grid h-8 w-8 place-items-center rounded-xl bg-mint-soft text-[#2e7f69]">
              <Check className="h-4 w-4" strokeWidth={2.2} />
            </span>
            <div>
              <p className="text-[0.55rem] font-semibold uppercase tracking-[0.16em] text-ink-muted">
                Quest complete
              </p>
              <p className="text-sm font-bold text-ink">+120 XP</p>
            </div>
          </div>
          <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-ink/[0.06]">
            <div className="h-full w-[76%] rounded-full bg-gradient-to-r from-mint to-sky" />
          </div>
        </div>
      </Floating>

      <Floating
        className="absolute bottom-[2%] left-[6%] z-20 hidden md:block"
        delay={1.4}
        distance={6}
        duration={7.2}
        rotate={-1}
      >
        <div className="flex items-center gap-2.5 rounded-2xl border border-white/80 bg-white/90 py-2.5 pl-2.5 pr-4 shadow-[0_22px_48px_-28px_rgba(30,24,58,0.55)] backdrop-blur-md">
          <span className="relative grid h-9 w-9 place-items-center rounded-full bg-[linear-gradient(145deg,#eef8fc,#c8e9f4)]">
            <Sparkles className="h-4 w-4 text-[#2a7e9d]" strokeWidth={1.8} />
            <span className="absolute right-0 top-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-mint" />
          </span>
          <div>
            <p className="text-[0.58rem] font-semibold uppercase tracking-[0.15em] text-ink-muted">
              Companion online
            </p>
            <p className="text-xs font-semibold text-ink">Ready to explore?</p>
          </div>
        </div>
      </Floating>
    </div>
  );
}
