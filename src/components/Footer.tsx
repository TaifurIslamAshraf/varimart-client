import Image from "next/image";

import { styles } from "@/app/[lang]/styles";
import { cn } from "@/lib/utils";

import { Facebook, Mail, Phone, Youtube } from "lucide-react";
import Link from "next/link";
import Delivery from "../../public/delivery-fast.png";
import Logo from "../../public/logo.png";
import Natural from "../../public/natural.png";
import Payment from "../../public/secure-payment.png";

const Footer = () => {
  return (
    <>
      <div
        className={cn(
          styles.paddingX,
          "bg-secondary py-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-start gap-20 md:gap-6"
        )}
      >
        <div className="flex items-center justify-center px-2 gap-3">
          <Image
            src={Delivery}
            alt="super fast delivery"
            width={60}
            height={60}
          />
          <div className="space-y-2">
            <h1 className="font-semibold text-xl">গ্রিন ডেলিভারি</h1>
            <p>৩-৫ দিনের মধ্যে আপনার পণ্য পৌছে যাবে</p>
          </div>
        </div>
        <div className="flex items-center justify-center px-2 gap-3">
          <Image
            src={Payment}
            alt="super fast delivery"
            width={60}
            height={60}
          />
          <div className="space-y-2">
            <h1 className="font-semibold text-xl">নিরাপদ পেমেন্ট</h1>
            <p>বিভিন্ন পেমেন্ট পদ্ধতি থেকে বেছে নিন</p>
          </div>
        </div>
        <div className="flex items-center justify-center px-2 gap-3">
          <Image
            src={Natural}
            alt="super fast delivery"
            width={60}
            height={60}
          />
          <div className="space-y-2">
            <h1 className="font-semibold text-xl">১০০% ন্যাচারাল</h1>
            <p>প্রাকৃতিক উপাদান ব্যবহার করতে আমরা প্রতিশ্রুতিবদ্ধ</p>
          </div>
        </div>
      </div>

      <div className="">
        <div
          className={cn(
            "p-8",
            styles.paddingX,
            "bg-[#1C4245] text-secondary grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-between gap-10"
          )}
        >
          <div className="space-y-4">
            <div className="">
              <Image src={Logo} alt="shop logo" width={100} height={100} />
            </div>
            <p className="text-[#cfc6c6]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui quis
              rem dicta sint ipsa sequi perspiciatis. Commodi maiores dolorum
              iusto autem distinctio.
            </p>
            <div className="flex items-center gap-4">
              <Link href={"/"}>
                <Facebook className="border border-secondary h-[45px] p-2 w-[45px] rounded-full" />
              </Link>

              <Link href={"/"}>
                <Youtube className="border border-secondary h-[45px] p-2 w-[45px] rounded-full" />
              </Link>

              <Link href={"mailto:someone@example.com"}>
                <Mail className="border border-secondary h-[45px] p-2 w-[45px] rounded-full" />
              </Link>

              <Link href={"tel:+8801645120517"}>
                <Phone className="border border-secondary h-[45px] p-2 w-[45px] rounded-full" />
              </Link>
            </div>
          </div>

          <div className="text-[#cfc6c6] space-y-2 md:space-y-8">
            <h1 className="text-secondary text-xl font-semibold">
              QUICK LINKS
            </h1>
            <div className="flex flex-col gap-2">
              <Link href={"/"}>About Us</Link>
              <Link href={"/"}>Products</Link>
              <Link href={"/"}>Blogs</Link>
              <Link href={"/"}>FAQ</Link>
            </div>
          </div>

          <div className="text-[#cfc6c6] space-y-2 md:space-y-8">
            <h1 className="text-secondary text-xl font-semibold">
              OUR COMPANY
            </h1>
            <div className="flex flex-col gap-2">
              <Link href={"mailto:"}>Privacy Policy</Link>
              <Link href={"/"}>Refund and Returns Policy</Link>
              <Link href={"/"}>Customer Support</Link>
              <Link href={"/"}>Report Bugs</Link>
            </div>
          </div>

          <div className="text-[#cfc6c6] space-y-2 md:space-y-8">
            <h1 className="text-secondary text-xl font-semibold">CONTACT US</h1>
            <div className="flex flex-col gap-2">
              <Link
                target="_blank"
                href="https://wa.me/+8801645120517?text=How can i help you ?"
              >
                Whatsapp: +8801645120517
              </Link>
              <Link href={"tel:+8801645120517"}>Phone: +8801645120517</Link>
              <Link href={"mailto:someone@example.com"}>
                Email: example@gmail.com
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
