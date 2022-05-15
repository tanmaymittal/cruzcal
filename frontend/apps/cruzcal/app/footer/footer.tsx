/* eslint-disable-next-line */
export interface FooterProps {}

export function Footer(props: FooterProps) {
  return (
    <div className="container mx-auto p-3">
      <p className="text-center text-white text-xs">
        &copy;2022 CruzCal. All rights reserved.
      </p>      
    </div>
  )
}

export default Footer;
