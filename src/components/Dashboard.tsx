import React, { FC } from 'react'
import Header from './Header'

const Dashboard: FC = () => {
    return (
        <section className="w-full md:max-w-[1060px] p-4 flex flex-col text-center items-center justify-start md:px-10 h-full lg:h-[800px] bg-white bg-opacity-20 backdrop-blur-ls rounded drop-shadow-lg text-zinc-700">
            <Header />
        </section>
    )
}

export default Dashboard
