const Footer = () => {
  return (
    <div className="bg-purple-600 text-white py-6">
      <div className="container flex items-center justify-between gap-3 md:flex-row flex-col">
        <h1 className="font-bold tracking-tight text-2xl ">
          SukhShantiNivas.com
        </h1>
        <div className="cursor-pointer font-bold flex gap-3">
          <p>Privacy Policy </p>
          <p>terms of servises </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
