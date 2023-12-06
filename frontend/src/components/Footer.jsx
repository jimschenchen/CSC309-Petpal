const Footer = ({userType}) => {
    const footerColor = () => {
        if (userType === 'seeker') {
            return "bg-seeker";
        }
        else if (userType === 'shelter') {
            return "bg-shelter";
        }
        else {
            return "bg-guest";
        }
    }

    return ( 
    <footer className={"text-white p-2 bottom-0 w-full h-10 " + footerColor()}>
        <p>&copy; 2023 PetPal. All rights reserved.</p>
    </footer> 
    );
}
 
export default Footer;