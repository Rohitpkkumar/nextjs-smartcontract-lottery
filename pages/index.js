import Head from "next/head"
// import { ManualHeader } from '../components/ManualHeader'
import { Header } from "../components/Header"
import { LotteryEntrance } from "../components/LotteryEntrance"

export default function Home() {
    return (
        <div>
            <Head>
                <title>Smart Contract Lottery</title>
            </Head>
            <div>
                <Header />
                <LotteryEntrance />
            </div>
        </div>
    )
}
