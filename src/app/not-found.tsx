// import Link from "next/link"
// import { AlertTriangle, Code, Zap } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// export default function NotFound() {
//   return (
//     // <div className="flex min-h-screen items-center justify-center bg-dark-100 bg-pattern bg-cover bg-top p-4">
//     <div className="flex min-h-screen items-center justify-center bg-zinc-950 p-4">
//       <Card className="w-full max-w-max border-2 border-dashed border-zinc-800 bg-zinc-900 text-center shadow-xl">
//         <CardHeader className="flex flex-col items-center space-y-4 pb-2">
//           <div className="relative">
//             <AlertTriangle className="size-16 animate-pulse text-destructive" />
//             <Zap className="absolute -right-2 -top-2 size-6 animate-bounce text-yellow-500" />
//           </div>
//           <CardTitle className="flex items-center gap-2 text-3xl font-bold text-zinc-100">
//             <Code className="size-8 text-primary" />
//             404 // Endpoint Not Found
//           </CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-6 pt-4">
//           <p className="rounded-lg border border-dashed bg-zinc-800 p-3 font-mono text-sm text-zinc-400">
//             {">"} Looks like you&apos;ve navigated to a digital dead-end.
//             <br />
//             {">"} No route matches this request.
//             <br />
//             {">"} Error: Destination Unreachable
//           </p>
//           <div className="flex justify-center space-x-4">
//             <Link href="/" passHref>
//               <Button
//                 variant="outline"
//                 className="flex items-center gap-2 bg-zinc-800 text-zinc-100 hover:bg-zinc-700 hover:text-zinc-100"
//               >
//                 <Zap className="size-4" />
//                 Reboot to Home
//               </Button>
//             </Link>
//             <Button
//               variant="destructive"
//               className="flex items-center gap-2 bg-red-900 hover:bg-red-800"
//             >
//               <Code className="size-4" />
//               Debug
//             </Button>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//     // </div>
//   )
// }

import Link from "next/link"
import { AlertTriangle, Code, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 p-6">
      <Card className="w-full max-w-fit border-2 border-dashed border-zinc-800 bg-zinc-900 text-center shadow-xl">
        <CardHeader className="flex flex-col items-center space-y-4 pb-2">
          <div className="relative">
            <AlertTriangle className="size-16 animate-pulse text-destructive" />
            <Zap className="absolute -right-2 -top-2 size-6 animate-bounce text-yellow-500" />
          </div>
          <CardTitle className="flex items-center gap-2 text-2xl font-bold text-zinc-100 md:text-3xl">
            <Code className="size-6 text-primary md:size-8" />
            404 // Endpoint Not Found
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 pt-4">
          <p className="rounded-lg border border-dashed bg-zinc-800 p-3 font-mono text-xs text-zinc-400 md:text-sm">
            {">"} Looks like you&apos;ve navigated to a digital dead-end.
            <br />
            {">"} No route matches this request.
            <br />
            {">"} Error: Destination Unreachable
          </p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/" passHref>
              <Button
                variant="outline"
                className="flex w-full items-center gap-2 bg-zinc-800 text-zinc-100 hover:bg-zinc-700 hover:text-zinc-100 sm:w-auto"
              >
                <Zap className="size-4" />
                Reboot to Home
              </Button>
            </Link>
            <Button
              variant="destructive"
              className="flex w-full items-center gap-2 bg-red-900 hover:bg-red-800 sm:w-auto"
            >
              <Code className="size-4" />
              Debug
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// "use client"
// import Link from "next/link"
// import { Button } from "@/components/ui/button"
// import { Terminal } from "lucide-react"

// export default function Custom404() {
//   return (
//     <div className="flex h-screen items-center justify-center bg-zinc-900 font-mono text-zinc-400">
//       <div className="space-y-6 rounded-lg border border-zinc-600 p-8 text-center shadow-lg">
//         <Terminal className="mx-auto size-16 text-zinc-500" />
//         <h1 className="text-6xl font-bold text-zinc-300">Error 404</h1>
//         <p className="text-lg text-zinc-400">SYSTEM FAILURE: Page Not Found</p>
//         <p className="text-sm text-zinc-500">
//           The requested resource is unavailable. Please check your request or
//           return to safety.
//         </p>

//         <Button
//           asChild
//           className="rounded-lg border border-zinc-600 bg-transparent px-6 py-3 font-semibold text-zinc-400 shadow-md hover:bg-zinc-700 hover:text-white"
//         >
//           <Link href="/">Return to Mainframe</Link>
//         </Button>
//       </div>

//       <style jsx>{`
//         .glitch {
//           position: relative;
//           display: inline-block;
//           text-shadow:
//             2px 2px 4px rgba(150, 150, 150, 0.7),
//             -2px -2px 4px rgba(100, 100, 100, 0.7);
//           animation: glitch-animation 1.2s infinite alternate;
//         }
//         @keyframes glitch-animation {
//           0% {
//             transform: skewX(-5deg);
//           }
//           100% {
//             transform: skewX(5deg);
//           }
//         }
//       `}</style>
//     </div>
//   )
// }
