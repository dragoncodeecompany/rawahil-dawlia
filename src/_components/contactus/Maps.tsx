import React from "react";

function Maps() {
  return (
    <section className="w-full h-[400px] md:h-[500px] lg:h-[600px] pt-10">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3450.831455960871!2d31.2380864!3d30.127636!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14586b00074536d9%3A0x49bd87d9ab5af9c8!2z2LTYsdmD2Ycg2KfZhNix2YjYp9it2YQg2KfZhNiv2YjZhNmK2Ycg2YTYp9mE2K3Yp9mCINin2YTYudmF2KfZhNmHINio2KfZhNiu2KfYsdisINiq2LHYrtmK2LUgMTAzMw!5e0!3m2!1sar!2seg!4v1756602777153!5m2!1sar!2seg"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Location Map"
        className="rounded-lg shadow-lg"
      ></iframe>
    </section>
  );
}

export default Maps;
