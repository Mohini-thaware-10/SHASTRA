"use client";

import { useId } from "react";

import { cn } from "@/lib/utils";
import type { UniverseId } from "@/types/theme";

interface UniverseArtworkProps {
  universe: UniverseId;
  className?: string;
  compact?: boolean;
}

function JuniorArtwork({ compact }: { compact: boolean }) {
  const uid = `u${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const ref = (name: string) => `url(#${uid}-${name})`;
  return (
    <svg
      viewBox="0 0 420 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`${uid}-j-sky`} x1="210" y1="0" x2="210" y2="300" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fff9ef" />
          <stop offset="0.52" stopColor="#ffe6d1" />
          <stop offset="1" stopColor="#dff4fb" />
        </linearGradient>
        <linearGradient id={`${uid}-j-hill-back`} x1="0" y1="200" x2="420" y2="300" gradientUnits="userSpaceOnUse">
          <stop stopColor="#b8e8d6" />
          <stop offset="1" stopColor="#75c9ab" />
        </linearGradient>
        <linearGradient id={`${uid}-j-hill-front`} x1="0" y1="238" x2="420" y2="300" gradientUnits="userSpaceOnUse">
          <stop stopColor="#8dd9bd" />
          <stop offset="1" stopColor="#4fae8f" />
        </linearGradient>
        <linearGradient id={`${uid}-j-rocket`} x1="44" y1="123" x2="80" y2="177" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fffaf1" />
          <stop offset="1" stopColor="#f3e5cf" />
        </linearGradient>
        <linearGradient id={`${uid}-j-book`} x1="212" y1="214" x2="298" y2="260" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fff9ea" />
          <stop offset="1" stopColor="#f2deba" />
        </linearGradient>
        <radialGradient id={`${uid}-j-sun`} cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(348 60) rotate(90) scale(34)">
          <stop stopColor="#fff4cf" />
          <stop offset="1" stopColor="#f0bd54" />
        </radialGradient>
      </defs>

      <rect width="420" height="300" fill={ref("j-sky")} />
      <circle cx="348" cy="60" r="46" fill="#f6cb6d" opacity="0.18" />
      <circle cx="348" cy="60" r="28" fill={ref("j-sun")} />
      <circle cx="338" cy="55" r="2.6" fill="#8f5c24" />
      <circle cx="357" cy="55" r="2.6" fill="#8f5c24" />
      <path d="M339 66C344 71 352 71 357 66" stroke="#8f5c24" strokeWidth="2" strokeLinecap="round" />

      <g opacity="0.9">
        <path d="M50 92C50 80 60 72 72 72C76 60 88 53 100 56C110 44 129 44 137 58C152 55 164 66 163 80C176 81 184 90 183 101H49C48 98 48 95 50 92Z" fill="#ffffff" opacity="0.82" />
        <path d="M291 116C291 107 299 100 308 100C311 91 321 86 331 88C338 78 353 79 359 90C371 88 380 96 379 107C389 108 396 114 395 123H290C289 121 289 118 291 116Z" fill="#ffffff" opacity="0.62" />
      </g>

      <path d="M-10 264C55 203 133 205 201 246C278 292 353 274 430 224V310H-10Z" fill={ref("j-hill-back")} opacity="0.78" />
      <path d="M-10 284C59 236 134 232 210 264C296 300 369 286 430 254V310H-10Z" fill={ref("j-hill-front")} />

      {!compact ? (
        <>
          <path d="M44 150C60 146 72 158 69 174C66 190 50 195 39 184C29 174 32 154 44 150Z" fill="#ec8a5b" />
          <path d="M54 178C68 188 84 187 96 177" stroke="#ffffff" strokeWidth="1.5" strokeDasharray="2 5" strokeLinecap="round" />
          <path d="M397 158C410 152 421 163 418 176C415 189 400 193 391 184C382 175 385 162 397 158Z" fill="#7b6ce8" opacity="0.55" />
        </>
      ) : null}

      <g>
        <path d="M55 134C55 113 69 99 86 99C103 99 117 113 117 134V169H55V134Z" fill={ref("j-rocket")} stroke="#e8d5b6" />
        <path d="M86 99C94 89 104 83 112 80C112 90 108 98 102 104" fill="#ec8a5b" />
        <path d="M86 99C78 89 68 83 60 80C60 90 64 98 70 104" fill="#ec8a5b" />
        <circle cx="86" cy="130" r="11" fill="#bfe8f5" stroke="#ffffff" strokeWidth="3" />
        <path d="M55 153L43 171L56 168Z" fill="#d3a041" />
        <path d="M117 153L129 171L116 168Z" fill="#d3a041" />
        <path d="M76 171C77 183 86 190 86 190C86 190 95 183 96 171Z" fill="#ec8a5b" />
        <path d="M82 174C83 182 86 187 86 187C86 187 89 182 90 174Z" fill="#f6cf72" />
      </g>

      <g>
        <ellipse cx="264" cy="233" rx="64" ry="9" fill="#3d8f75" opacity="0.18" />
        <rect x="218" y="218" width="84" height="19" rx="4" fill={ref("j-book")} stroke="#dfcba5" />
        <rect x="222" y="202" width="78" height="18" rx="4" fill="#f8f1e2" stroke="#dfcba5" />
        <rect x="214" y="186" width="88" height="18" rx="4" fill="#eee5ff" stroke="#cbbcf9" />
        <rect x="234" y="222" width="6" height="12" fill="#d9c7a0" />
        <rect x="306" y="191" width="6" height="21" fill="#c99a3f" />

        <circle cx="264" cy="160" r="24" fill="#f7c9a6" />
        <path d="M240 160C240 143 250 134 264 134C278 134 289 143 289 160C282 153 274 150 264 150C254 150 247 153 240 160Z" fill="#5e4bc6" />
        <circle cx="256" cy="162" r="2.4" fill="#3b2a5e" />
        <circle cx="272" cy="162" r="2.4" fill="#3b2a5e" />
        <path d="M259 170C262 173 266 173 269 170" stroke="#b15c48" strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="249" cy="167" r="3" fill="#f0a6ad" opacity="0.65" />
        <circle cx="279" cy="167" r="3" fill="#f0a6ad" opacity="0.65" />
        <path d="M247 185C247 176 254 171 264 171C274 171 281 176 281 185V193H247V185Z" fill="#ec8a5b" />
        <path d="M251 185C257 189 271 189 277 185" stroke="#f9d99f" strokeWidth="4" strokeLinecap="round" />
        <path d="M264 134L264 120" stroke="#5e4bc6" strokeWidth="2" strokeLinecap="round" />
        <path d="M264 120L273 125L264 130Z" fill="#f0bd54" />
      </g>

      <g>
        <rect x="130" y="229" width="24" height="24" rx="5" fill="#ffffff" stroke="#f0d8b6" transform="rotate(-8 130 229)" />
        <text x="138" y="246" fill="#d3a041" fontSize="14" fontFamily="var(--font-sora), sans-serif" fontWeight="700" transform="rotate(-8 138 246)">A</text>
        <rect x="158" y="240" width="21" height="21" rx="5" fill="#fff0e7" stroke="#f1cfbb" transform="rotate(6 158 240)" />
        <text x="165" y="255" fill="#c56532" fontSize="13" fontFamily="var(--font-sora), sans-serif" fontWeight="700" transform="rotate(6 165 255)">1</text>
        <rect x="341" y="222" width="22" height="22" rx="5" fill="#eef6fb" stroke="#cce8f3" transform="rotate(-5 341 222)" />
        <text x="348" y="237" fill="#287b9e" fontSize="13" fontFamily="var(--font-sora), sans-serif" fontWeight="700" transform="rotate(-5 348 237)">?</text>
      </g>

      {!compact ? (
        <>
          <path d="M184 111C186 99 197 92 208 96C212 88 222 86 228 92C236 88 245 92 247 100C256 100 262 107 260 115H184C183 114 183 112 184 111Z" fill="#ffffff" opacity="0.75" />
          <circle cx="378" cy="205" r="4" fill="#ec8a5b" opacity="0.6" />
          <circle cx="40" cy="225" r="3" fill="#7b6ce8" opacity="0.6" />
          <path d="M388 195L388 215M378 205L398 205" stroke="#d3a041" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
        </>
      ) : null}
    </svg>
  );
}

function NexusArtwork({ compact }: { compact: boolean }) {
  const uid = `u${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const ref = (name: string) => `url(#${uid}-${name})`;
  return (
    <svg
      viewBox="0 0 420 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`${uid}-n-sky`} x1="210" y1="0" x2="210" y2="300" gradientUnits="userSpaceOnUse">
          <stop stopColor="#29224f" />
          <stop offset="0.5" stopColor="#4e4188" />
          <stop offset="0.82" stopColor="#8c7fd3" />
          <stop offset="1" stopColor="#c4e6f2" />
        </linearGradient>
        <radialGradient id={`${uid}-n-planet`} cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(338 66) rotate(90) scale(46)">
          <stop stopColor="#ffe9b8" />
          <stop offset="0.65" stopColor="#e9b55e" />
          <stop offset="1" stopColor="#a97736" />
        </radialGradient>
        <linearGradient id={`${uid}-n-island`} x1="114" y1="206" x2="316" y2="292" gradientUnits="userSpaceOnUse">
          <stop stopColor="#56438e" />
          <stop offset="0.62" stopColor="#3c2d6c" />
          <stop offset="1" stopColor="#271d4b" />
        </linearGradient>
        <linearGradient id={`${uid}-n-grass`} x1="106" y1="198" x2="327" y2="222" gradientUnits="userSpaceOnUse">
          <stop stopColor="#7fd6bb" />
          <stop offset="1" stopColor="#3f9f86" />
        </linearGradient>
        <linearGradient id={`${uid}-n-castle`} x1="170" y1="123" x2="273" y2="219" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fff7e7" />
          <stop offset="0.55" stopColor="#f3e2c1" />
          <stop offset="1" stopColor="#d8be91" />
        </linearGradient>
        <linearGradient id={`${uid}-n-portal`} x1="203" y1="144" x2="241" y2="199" gradientUnits="userSpaceOnUse">
          <stop stopColor="#f6eaff" />
          <stop offset="0.5" stopColor="#bda9ff" />
          <stop offset="1" stopColor="#6b58d7" />
        </linearGradient>
        <linearGradient id={`${uid}-n-rocket`} x1="80" y1="216" x2="110" y2="248" gradientUnits="userSpaceOnUse">
          <stop stopColor="#e8f8ff" />
          <stop offset="1" stopColor="#95cfe3" />
        </linearGradient>
      </defs>

      <rect width="420" height="300" fill={ref("n-sky")} />
      <circle cx="338" cy="66" r="50" fill="#e9b55e" opacity="0.14" />
      <circle cx="338" cy="66" r="28" fill={ref("n-planet")} />
      <ellipse cx="338" cy="66" rx="45" ry="11" transform="rotate(-18 338 66)" stroke="#f6dda2" strokeWidth="2" opacity="0.7" />

      <g fill="#ffffff">
        <circle cx="44" cy="54" r="1.6" opacity="0.8" />
        <circle cx="123" cy="38" r="1.2" opacity="0.65" />
        <circle cx="188" cy="65" r="1.8" opacity="0.85" />
        <circle cx="266" cy="34" r="1.1" opacity="0.6" />
        <circle cx="389" cy="112" r="1.4" opacity="0.7" />
        <circle cx="75" cy="126" r="1.1" opacity="0.5" />
        <circle cx="240" cy="96" r="1.5" opacity="0.7" />
        <circle cx="160" cy="112" r="1" opacity="0.5" />
      </g>

      <path d="M58 84L88 72L118 85L98 103Z" stroke="rgba(255,255,255,0.22)" strokeWidth="1" />
      <path d="M88 72L98 103M58 84L98 103M118 85L98 103" stroke="rgba(255,255,255,0.14)" strokeWidth="1" />
      <circle cx="58" cy="84" r="2" fill="#f0c978" />
      <circle cx="88" cy="72" r="2" fill="#ffffff" />
      <circle cx="118" cy="85" r="2" fill="#8ed9c0" />
      <circle cx="98" cy="103" r="2" fill="#ffffff" opacity="0.7" />

      <g opacity="0.52">
        <path d="M32 205C47 194 72 193 88 204C73 218 48 218 32 205Z" fill="#6a58b7" />
        <path d="M39 207C46 213 55 216 63 216" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
        <path d="M330 183C343 174 364 174 377 184C364 196 343 196 330 183Z" fill="#7b6ce8" />
      </g>

      <path d="M32 246C101 226 166 224 218 238C290 258 353 252 418 230V310H32Z" fill="#221a40" opacity="0.55" />
      <path d="M84 228C119 219 153 219 185 230C147 246 113 247 84 228Z" fill="#3a2c66" opacity="0.85" />

      <ellipse cx="211" cy="213" rx="113" ry="19" fill={ref("n-grass")} />
      <path d="M98 212C112 244 154 274 210 274C267 274 309 243 323 211C300 226 262 234 211 234C159 234 121 226 98 212Z" fill={ref("n-island")} />
      <path d="M126 228C147 247 173 257 202 257" stroke="rgba(255,255,255,0.12)" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M239 270C271 263 298 246 316 226" stroke="rgba(255,255,255,0.1)" strokeWidth="2.5" strokeLinecap="round" />

      <g>
        <rect x="164" y="176" width="94" height="52" rx="6" fill={ref("n-castle")} stroke="#d7bf95" />
        <path d="M164 176L178 161L192 176Z" fill="#f8eeda" stroke="#d7bf95" />
        <path d="M230 176L244 161L258 176Z" fill="#f8eeda" stroke="#d7bf95" />
        <rect x="153" y="148" width="31" height="82" rx="4" fill={ref("n-castle")} stroke="#d7bf95" />
        <rect x="239" y="135" width="36" height="95" rx="4" fill={ref("n-castle")} stroke="#d7bf95" />
        <path d="M153 148L168 129L184 148Z" fill="#8b7be0" />
        <path d="M239 135L257 111L275 135Z" fill="#ec8a5b" />
        <path d="M257 111V93" stroke="#d3a041" strokeWidth="2" />
        <path d="M257 93L273 99L257 106Z" fill="#f0c978" />
        <path d="M168 129V112" stroke="#d3a041" strokeWidth="2" />
        <path d="M168 112L182 117L168 123Z" fill="#8ed9c0" />
        <path d="M204 190C204 174 216 162 232 162C248 162 260 174 260 190V214H204V190Z" fill={ref("n-portal")} stroke="rgba(255,255,255,0.7)" />
        <path d="M232 162V214M204 190H260" stroke="rgba(255,255,255,0.34)" strokeWidth="1" />
        <path d="M173 189C173 182 179 176 186 176C193 176 199 182 199 189V210H173V189Z" fill="#bfe8f5" opacity="0.72" />
        <path d="M247 183C247 176 253 170 260 170C267 170 273 176 273 183V202H247V183Z" fill="#bfe8f5" opacity="0.62" />
        <path d="M164 176H258" stroke="#c7a96f" strokeWidth="1.4" />
      </g>

      <g>
        <path d="M118 236L128 213L138 236Z" fill="#8b7be0" />
        <path d="M128 213V201" stroke="#8ed9c0" strokeWidth="2" />
        <path d="M128 201L139 205L128 210Z" fill="#8ed9c0" />
        <circle cx="141" cy="229" r="7" fill="#8ed9c0" opacity="0.8" />
        <circle cx="139" cy="227" r="2.5" fill="#ffffff" opacity="0.7" />
      </g>

      {!compact ? (
        <>
          <g>
            <path d="M310 223L326 196L342 223Z" fill="#3b2d6a" />
            <path d="M326 196V178" stroke="#d3a041" strokeWidth="2" />
            <path d="M326 178L342 184L326 190Z" fill="#ec8a5b" />
            <circle cx="326" cy="219" r="4" fill="#f0c978" />
          </g>

          <g>
            <path d="M62 205L80 187L98 205L80 222Z" fill="#35285f" opacity="0.9" />
            <rect x="76" y="194" width="8" height="17" rx="3" fill={ref("n-rocket")} />
            <path d="M80 194L80 183" stroke="#8ed9c0" strokeWidth="1.5" />
            <circle cx="80" cy="181" r="2.5" fill="#8ed9c0" />
          </g>

          <path d="M302 84C316 76 336 80 344 94" stroke="rgba(255,255,255,0.25)" strokeWidth="1.2" strokeDasharray="2 5" />
          <circle cx="344" cy="94" r="3" fill="#f0c978" />
          <path d="M352 120L362 126L352 132L342 126Z" fill="#ffffff" opacity="0.6" />
        </>
      ) : null}
    </svg>
  );
}

function AscendArtwork({ compact }: { compact: boolean }) {
  const uid = `u${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const ref = (name: string) => `url(#${uid}-${name})`;
  return (
    <svg
      viewBox="0 0 420 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`${uid}-a-sky`} x1="210" y1="0" x2="210" y2="300" gradientUnits="userSpaceOnUse">
          <stop stopColor="#f8fbfd" />
          <stop offset="0.5" stopColor="#e3f0f6" />
          <stop offset="1" stopColor="#f7edd7" />
        </linearGradient>
        <linearGradient id={`${uid}-a-dome`} x1="142" y1="108" x2="288" y2="226" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ffffff" />
          <stop offset="0.55" stopColor="#e8f3f8" />
          <stop offset="1" stopColor="#bdd9e6" />
        </linearGradient>
        <linearGradient id={`${uid}-a-glass`} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#ffffff" stopOpacity="0.9" />
          <stop offset="1" stopColor="#9ccadd" stopOpacity="0.65" />
        </linearGradient>
        <linearGradient id={`${uid}-a-gold`} x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#f3dca6" />
          <stop offset="1" stopColor="#c69a42" />
        </linearGradient>
        <linearGradient id={`${uid}-a-ground`} x1="0" y1="238" x2="420" y2="300" gradientUnits="userSpaceOnUse">
          <stop stopColor="#dcebf2" />
          <stop offset="1" stopColor="#b7d6e2" />
        </linearGradient>
        <linearGradient id={`${uid}-a-tower`} x1="312" y1="150" x2="364" y2="236" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fdfefe" />
          <stop offset="1" stopColor="#c8e0ea" />
        </linearGradient>
      </defs>

      <rect width="420" height="300" fill={ref("a-sky")} />
      <circle cx="210" cy="244" r="132" fill="#ffffff" opacity="0.4" />
      <circle cx="74" cy="66" r="26" fill="#f0c978" opacity="0.2" />
      <circle cx="74" cy="66" r="13" fill="#f3d79a" opacity="0.9" />

      <ellipse cx="210" cy="153" rx="186" ry="74" transform="rotate(-8 210 153)" stroke="rgba(39,125,153,0.22)" strokeWidth="1.2" strokeDasharray="2 7" />
      <ellipse cx="210" cy="161" rx="154" ry="94" transform="rotate(12 210 161)" stroke="rgba(201,154,63,0.28)" strokeWidth="1" strokeDasharray="2 8" />

      <path d="M-8 255C69 235 132 231 205 243C286 256 349 250 428 229V310H-8Z" fill={ref("a-ground")} />
      <path d="M-8 277C76 259 146 259 216 272C291 286 360 280 428 264V310H-8Z" fill="#acccdb" opacity="0.7" />

      <path d="M92 244H328L311 258H109Z" fill="#d5e6ee" />
      <path d="M108 258H312L299 271H121Z" fill="#c4dce7" />

      <g>
        <rect x="150" y="190" width="120" height="54" rx="5" fill={ref("a-dome")} stroke="#bcd8e4" />
        <path d="M150 190C150 144 176 116 210 116C244 116 270 144 270 190Z" fill={ref("a-dome")} stroke="#bcd8e4" />
        <path d="M172 190C172 155 188 134 210 134C232 134 248 155 248 190Z" fill={ref("a-glass")} opacity="0.7" />
        <path d="M210 116V244M173 144V244M247 144V244M150 190H270" stroke="rgba(39,125,153,0.16)" strokeWidth="1" />
        <path d="M194 244V211C194 202 201 195 210 195C219 195 226 202 226 211V244" fill="#d8eaf2" stroke="#aecfdd" />
        <path d="M150 190H270" stroke={ref("a-gold")} strokeWidth="3" />
        <path d="M210 116V99" stroke="#c69a42" strokeWidth="2" />
        <circle cx="210" cy="95" r="4.5" fill="#e9c67e" stroke="#c69a42" />
        <path d="M178 244V226C178 220 183 216 188 216C193 216 198 220 198 226V244M222 244V217C222 211 227 207 232 207C237 207 242 211 242 217V244" stroke="#a9ccda" strokeWidth="2" />
      </g>

      <g>
        <rect x="310" y="177" width="52" height="67" rx="4" fill={ref("a-tower")} stroke="#bcd8e4" />
        <path d="M310 177L336 154L362 177Z" fill="#eef7fa" stroke="#bcd8e4" />
        <path d="M324 193H348M324 207H348M324 221H348" stroke="#9dc6d7" strokeWidth="2" strokeLinecap="round" />
        <path d="M336 154V138" stroke="#c69a42" strokeWidth="2" />
        <circle cx="336" cy="134" r="3.5" fill="#e9c67e" />
      </g>

      <g>
        <rect x="73" y="197" width="43" height="47" rx="4" fill="#f4fafc" stroke="#c7dfe9" />
        <path d="M73 197L94.5 178L116 197Z" fill="#eaf4f8" stroke="#c7dfe9" />
        <path d="M86 210H102M86 222H102M86 234H94" stroke="#a8ccda" strokeWidth="2" strokeLinecap="round" />
      </g>

      {!compact ? (
        <>
          <g>
            <circle cx="352" cy="92" r="25" stroke="rgba(39,125,153,0.32)" strokeWidth="1.3" />
            <ellipse cx="352" cy="92" rx="32" ry="9" transform="rotate(28 352 92)" stroke="rgba(201,154,63,0.55)" strokeWidth="1.3" />
            <ellipse cx="352" cy="92" rx="32" ry="9" transform="rotate(-28 352 92)" stroke="rgba(39,125,153,0.35)" strokeWidth="1.3" />
            <circle cx="352" cy="92" r="4" fill="#c69a42" />
          </g>
          <g opacity="0.8">
            <circle cx="55" cy="137" r="16" stroke="rgba(39,125,153,0.28)" strokeWidth="1.2" />
            <path d="M55 127V147M45 137H65M47.5 129.5L62.5 144.5M62.5 129.5L47.5 144.5" stroke="rgba(39,125,153,0.28)" strokeWidth="1" />
          </g>
          <path d="M123 110L131 116L123 122L115 116Z" fill="#ffffff" opacity="0.75" />
          <path d="M289 85L295 89L289 93L283 89Z" fill="#f0c978" opacity="0.8" />
          <circle cx="258" cy="72" r="1.6" fill="#277d99" opacity="0.45" />
          <circle cx="142" cy="80" r="1.2" fill="#c69a42" opacity="0.6" />
        </>
      ) : null}

      <path d="M210 271V285M187 279H233" stroke="#c69a42" strokeWidth="1.4" opacity="0.55" />
    </svg>
  );
}

export function UniverseArtwork({
  universe,
  className,
  compact = false,
}: UniverseArtworkProps) {
  return (
    <div className={cn("h-full w-full", className)}>
      {universe === "junior" ? <JuniorArtwork compact={compact} /> : null}
      {universe === "nexus" ? <NexusArtwork compact={compact} /> : null}
      {universe === "ascend" ? <AscendArtwork compact={compact} /> : null}
    </div>
  );
}
