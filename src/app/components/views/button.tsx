'use client';
const Button = ({ children }: { children: React.ReactNode }) => {
    const handleClik = () => {
        console.log('click');
    };

    return <button onClick={handleClik}>{children}</button>;
};

export default Button;