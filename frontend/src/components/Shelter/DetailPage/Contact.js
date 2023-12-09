const Contact = ({ shelter }) => {
    // Function to encode the address for use in a URL
    const encodeAddressForURL = (address) => {
      return encodeURIComponent(address);
    };

    const encodedEmail = encodeURIComponent(shelter?.email);
  
    // Construct the Google Maps URL with the shelter's address
    const googleMapsURL = `https://www.google.com/maps/search/?api=1&query=${encodeAddressForURL(shelter?.address)}`;
  
    return (
      <div className="bg-white p-6 rounded-lg shadow duration-300 hover:bg-gray-100 hover:shadow-md hover:p-8">
      <h2 className="text-2xl font-bold mb-4">Contact & Location</h2>
      <div>
        <strong>Location: </strong> 
        <a href={googleMapsURL} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
          {shelter?.address}
        </a>
      </div>
      <div>
        <strong>Phone: </strong> {shelter?.phone_number}
      </div>
      <div>
      <strong>Email: </strong> 
      <a href={`mailto:${encodedEmail}`} className="text-primary hover:underline">
        {shelter?.email}
      </a>
    </div>
      </div>
    );
  };
  
  export default Contact;
  
