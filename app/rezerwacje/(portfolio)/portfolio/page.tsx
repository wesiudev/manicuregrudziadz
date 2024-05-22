import Link from "next/link";
import PortfolioItem from "@/components/PortfolioItem";

export default function Page() {
  return (
    <div className="px-6 md:px-8 xl:px-32 font-sans py-12">
      <Link
        href="/rezerwacje"
        className=" text-zinc-800 drop-shadow-xl shadow-black"
      >
        /rezerwacje
      </Link>
      <Link
        href="/rezerwacje/portfolio"
        className=" text-zinc-800 drop-shadow-xl shadow-black"
      >
        /portfolio
      </Link>
      <h1 className="text-zinc-800 font-bold drop-shadow-lg shadow-black py-3 text-4xl mt-6">
        Salon Manicure Piękniej{" "}
        <span className="opacity-50 font-light"> - Portfolio</span>
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {[
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
          21, 22, 23, 24, 25, 26, 27, 28,
        ].map((item: any, i: any) => (
          <PortfolioItem key={i} item={item} />
        ))}
      </div>
      <div className="bg-zinc-700 p-3 rounded-xl  mt-6">
        <h2 className="text-gray-200 font-bold drop-shadow-lg shadow-black py-3 text-4xl">
          Kilka faktów o mnie
        </h2>
        <div className="lg:text-lg text-white mt-2">
          <p className="text-2xl font-bold mb-2">Dzień dobry ✨</p>
          Mam na imię Ania i prywatnie jestem żoną oraz mamą dwóch cudownych i
          szalonych chłopców 🙂{" "}
          <p className="">
            Zawodowo mieszam 2 moje pasje ale opowiem o jednej z nich: 16 lat
            temu kupiłam mój pierwszy zestaw do robienia paznokci akrylowych na
            tipsie (kto pamięta ? 🤣) i ćwiczyłam jak szalona, po to, by wrócić
            do swojej ogromnej pasji właśnie dzisiaj 🙈
          </p>{" "}
          <p className="">
            Prawie rok temu ukończyłam swoje pierwsze szkolenie u cudownej
            Grudziądzkiej stylistki Zuzi Dąbrowy ze studia{" "}
            <Link
              href="https://www.facebook.com/truscavapaznokcie/?locale=pl_PL"
              target="_blank"
              className="text-blue-500"
            >
              {" "}
              TRUSKAVA
            </Link>
            .
          </p>
          <p className="">
            Szybko zorientowałam się, że to jest absolutnie to! Kontynuowałam
            naukę u Zuzi o przedłużanie paznokci metodą żelową, doszkalałam się
            ponownie na szkoleniach indywidualnych czy grupowych, między innymi
            ze
            <Link
              href="https://sklep.gabriellenails.pl/blog/wszystko-o-stemplach-pieczatkach-do-zdobienia-paznokci-b15.html"
              target="_blank"
              className="text-blue-500"
            >
              {" "}
              stempli
            </Link>
            .{" "}
          </p>
          <p className="">
            Kolejne szkolenie z pedicure kosmetycznego ukończyłam u równie
            świetnej Patrycji z salonu{" "}
            <Link
              href="https://www.facebook.com/p.nowakowskacosmeticssalon/"
              target="_blank"
              className="text-blue-500"
            >
              {" "}
              P.Nowakowska Cosmetics
            </Link>{" "}
            również w Grudziądzu.
          </p>
          <p className="">
            {" "}
            Następnym krokiem było doszkolenie online u
            <Link
              href="https://nicolebukiej.pl/"
              target="_blank"
              className="text-blue-500"
            >
              {" "}
              Nicole Bukiej
            </Link>{" "}
            z Wrocławia.
          </p>{" "}
          <p className="">
            Wisienką na torcie było moje ostatnie szkolenie stacjonarne u
            Świetnej i pełnej pasji{" "}
            <Link
              href="https://www.instagram.com/julia.tarlecka.szkolenia/"
              target="_blank"
              className="text-blue-500"
            >
              {" "}
              Julii Tarleckiej
            </Link>{" "}
            we Wrocławiu.
          </p>{" "}
          <p className="">
            Nauczyłam się nowych technik aplikacji hybrydy, opracowania skórek
            jak i zmiany architektury paznokci kwadratowych. To wszystko robię
            po to, aby rozwijać się w świecie paznokci, który pokochałam całym
            sercem i chciałabym to wszystko pokazać w swojej codziennej pracy.{" "}
          </p>
          <p className="">
            Uwielbiam rozmowy z kobietami - wszystkie Jesteście inspirujące,
            ważne i piękne, dlatego dbanie o Was to dla mnie wielki zaszczyt i
            radość.{" "}
          </p>{" "}
          <p className="">
            Zaufanie jakim mnie obdarzacie to spełnienie moich marzeń
            dotyczących pracy z ludźmi. Dziękuję za poświęcenie czasu na
            przeczytanie kilku słów ode mnie i zachęcam do pozostania tutaj na
            dłużej!
          </p>
        </div>
      </div>
    </div>
  );
}
