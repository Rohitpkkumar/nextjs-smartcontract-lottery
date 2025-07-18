import { useWeb3Contract } from "react-moralis"
import { abi, contractAddress } from "../constants"
import { useMoralis } from "react-moralis"
import { useEffect, useState, useCallback } from "react"
import { ethers } from "ethers"
import { useNotification } from "web3uikit"
import { Bell } from "web3uikit"

export function LotteryEntrance() {
    const { chainId: chainIdHex, isWeb3Enabled, provider } = useMoralis()
    const chainId = parseInt(chainIdHex)
    const raffleAddress = chainId in contractAddress ? contractAddress[chainId][0] : null
    const [enterFee, setEntranceFee] = useState("0")
    const [numPlayers, setNumPlayers] = useState("0")
    const [recentWinner, setRecentWinner] = useState("0")
    const dispatch = useNotification()

    const {
        runContractFunction: enterRaffle,
        isLoading,
        isFetching,
    } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress,
        functionName: "enterRaffle",
        params: {},
        msgValue: enterFee,
    })

    const { runContractFunction: getEnteranceFee } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress,
        functionName: "getEnteranceFee",
        params: {},
    })

    const { runContractFunction: getNumberOfPlayer } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress,
        functionName: "getNumberOfPlayer",
        params: {},
    })

    const { runContractFunction: getRecentWinner } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress,
        functionName: "getRecentWinner",
        params: {},
    })

    const updateUI = useCallback(async () => {
        const entranceFeeFromCall = (await getEnteranceFee()).toString()
        const numPlayersFromCall = (await getNumberOfPlayer()).toString()
        const recentWinnerFromCall = (await getRecentWinner()).toString()
        setRecentWinner(recentWinnerFromCall)
        setEntranceFee(entranceFeeFromCall)
        setNumPlayers(numPlayersFromCall)
    }, [getEnteranceFee, getNumberOfPlayer, getRecentWinner])

    useEffect(() => {
        if (isWeb3Enabled) {
            updateUI()

            if (raffleAddress && provider) {
                const ethersProvider = new ethers.providers.Web3Provider(provider)
                const raffle = new ethers.Contract(raffleAddress, abi, ethersProvider)

                raffle.on("WinnerPicked", updateUI)
                
                return () => {
                    raffle.off("WinnerPicked", updateUI)
                }
            }
        }
    }, [isWeb3Enabled, raffleAddress, provider, updateUI])

    const handleSuccess = async function (tx) {
        await tx.wait(1)
        handleNewNotification(tx)
        updateUI()
    }

    const handleNewNotification = function () {
        dispatch({
            type: "info",
            message: "Transaction Complete!",
            title: "Transaction Notification",
            position: "topR",
            icon: <Bell fontSize={20} />,
        })
    }

    return (
        <div className="p-5">
            {raffleAddress ? (
                <div>
                    <button
                        className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
                        onClick={async function () {
                            await enterRaffle({
                                onSuccess: handleSuccess,
                                onError: (error) => console.log(error),
                            })
                        }}
                        disabled={isLoading || isFetching}
                    >
                        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                        <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-white px-3 py-1 text-sm font-medium text-black backdrop-blur-3xl">
                            {isLoading || isFetching ? (
                                <div className="animate-spin spinner-border h-8 w-8 border-b-2 rounded-full" />
                            ) : (
                                <div>Enter Raffle</div>
                            )}
                        </span>
                    </button>
                    <div>Enterance Fee :- {ethers.utils.formatUnits(enterFee, "ether")} ETH </div>
                    <div>Players :- {numPlayers}</div>
                    <div> Recent Winner :- {recentWinner}</div>
                </div>
            ) : (
                <div>No Raffle Address Detected</div>
            )}
        </div>
    )
}
