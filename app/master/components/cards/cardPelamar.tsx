'use client';

interface cardProps {
    position: string
}

const CardPelamar = ({ position }: cardProps) => {
    return (
        <div className={`px-8 py-8 w-1/2 ${position}`}>
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300 ease-in-out">
                <h1>Pelamar</h1>
                <hr />
            </div>
        </div>
    )
}

export default CardPelamar;