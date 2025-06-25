import * as React from "react";

import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import Counter from "yet-another-react-lightbox/plugins/counter";
import "yet-another-react-lightbox/plugins/counter.css";


const Lightbox1 = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <button className="mt-5" type="button" onClick={() => setOpen(true)}>
        Open Lightbox
      </button>

      <Lightbox
        plugins={[Captions, Counter]}
        counter={{ container: { style: { top: "unset", bottom: 0, right: 0, left: "unset" } } }}
        open={open}
        close={() => setOpen(false)}
        slides={[
          { src: "https://placehold.co/600x400", title: "Slide title1", description: "Slide description1", },
          { src: "https://placehold.co/600x400", title: "Slide title2", description: "Slide description2", },
          { src: "https://placehold.co/600x400", title: "Slide title3", description: "Slide description3", },
        ]}
      />
    </>
  );
}

export default Lightbox1;