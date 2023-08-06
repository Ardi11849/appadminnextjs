// components/Card.js
interface CardProps {
    title: string; // Provide a type annotation here
    content: string;
}
const Card = ({ title, content }: CardProps) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300 ease-in-out">
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-gray-700">{content}</p>
        </div>
    );
};

export default Card;