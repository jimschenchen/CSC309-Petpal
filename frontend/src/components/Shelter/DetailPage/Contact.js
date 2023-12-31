const Contact = ({ shelter }) => {
  // Function to encode the address for use in a URL
  const encodeAddressForURL = (address) => {
    return encodeURIComponent(address);
  };

  const encodedEmail = encodeURIComponent(shelter?.email);

  // Construct the Google Maps URL with the shelter's addressd 
  const googleMapsURL = `https://www.google.com/maps/search/?api=1&query=${encodeAddressForURL(shelter?.address)}`;

  return (
    <div className="bg-white p-6 rounded-lg shadow duration-300 
         hover:bg-gray-100 hover:shadow-md text-base">
      <div className="text-left">
        <strong>Location:</strong>
        <a href={googleMapsURL} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
          {shelter?.address}
        </a>
      </div>
      <div className="text-left">
        <strong>Phone:</strong> {shelter?.phone_number}
      </div>
      <div className="text-left">
        <strong>Email:</strong>
        <a href={`mailto:${encodedEmail}`} className="text-primary hover:underline">
          {shelter?.email}
        </a>
      </div>
    </div>
  );
};

export default Contact;

