import {Link} from "react-router-dom";

const PaymentSuccessPage = () => {
  return (
    <div className="text-center mt-20">
      <h1 className="text-2xl font-bold">Pembayaran Berhasil 🎉</h1>
      <p>Terima kasih. Top up kamu sudah kami terima.</p>
      <Link to="/" className="btn btn-primary mt-4">
        Kembali ke Beranda
      </Link>
    </div>
  );
};

export default PaymentSuccessPage;
