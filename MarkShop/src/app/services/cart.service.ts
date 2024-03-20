import { Injectable } from '@angular/core';
import { Observable, map, Subject } from 'rxjs';
import { SanphamService } from './sanpham.service';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
@Injectable({
    providedIn: 'root',
})
export class CartService {
    cartUpdated = new Subject<void>();
    constructor(
        private service: SanphamService,
    ) { }

    //Thêm vào giỏ hàng
    Themvaogio = (MaSanPham: number, soluong: number) => {
        this.service.getOne(MaSanPham).subscribe(res => {
            const sanpham = {
                MaSanPham: res.maSanPham,
                TenSP: res.tenSP,
                AnhDaiDien: res.anhDaiDien,
                SoLuong: soluong,
                DonGia: res.donGia,
            };
            //Kiểm tra có giảm giá không
            if (res.phanTram != null) {
                sanpham.DonGia = res.giaMoiKhiGiam;
            }
            let cart: any[] = JSON.parse(localStorage.getItem('cart') || '[]');

            const check = cart.find((item: any) => item.MaSanPham === sanpham.MaSanPham);

            //Đã tồn tại thì + 1, chưa thì thêm mới
            if (check) {
                check.SoLuong += soluong;
            } else {
                cart.push({ ...sanpham });
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            Swal.fire({
                title: 'Success',
                text: 'Đã thêm vào giỏ hàng!',
                icon: 'success'

            }).then((result) => {
                if (result.isConfirmed) {
                    this.cartUpdated.next();
                }
            })
        })

    }
    // Load giỏ hàng header
    loadGioHang = () => {
        let cart: any[] = JSON.parse(localStorage.getItem('cart') || '[]');
        var SoLuong = cart.reduce((total, item) => total + item.SoLuong, 0);
        var TongGia = cart.reduce((total, item) => total + (item.DonGia * item.SoLuong), 0);

        return { cart: cart, SoLuong: SoLuong, TongGia: TongGia };
    }

    // Tăng số lượng sản phẩm trong giỏ hàng
    tangGioHang = (MaSanPham: number) => {
        let cart: any[] = JSON.parse(localStorage.getItem('cart') || '[]');
        const item = cart.find(item => item.MaSanPham === MaSanPham);

        if (item) {
            item.SoLuong += 1;
            localStorage.setItem('cart', JSON.stringify(cart));
            this.cartUpdated.next();
        }
    }

    // Giảm số lượng sản phẩm trong giỏ hàng
    giamGioHang = (MaSanPham: number) => {
        let cart: any[] = JSON.parse(localStorage.getItem('cart') || '[]');
        const item = cart.find(item => item.MaSanPham === MaSanPham);

        if (item) {
            item.SoLuong -= 1;

            if (item.SoLuong <= 0) {
                cart = cart.filter(cartItem => cartItem.MaSanPham !== MaSanPham);
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            this.cartUpdated.next();
        }

    }

    // Xóa sản phẩm khỏi giỏ hàng
    deleteGioHang = (MaSanPham: number) => {
        Swal.fire({
            title: 'Thông báo',
            text: 'Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng không?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Xoá'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: 'Thông báo',
                    text: 'Sản phẩm đã xoá khỏi giỏ hàng',
                    icon: 'success',
                    confirmButtonText: 'Đóng', // You can customize the text of the confirmation button here
                    didClose: () => {
                        let cart: any[] = JSON.parse(localStorage.getItem('cart') || '[]');
                        cart = cart.filter(item => item.MaSanPham !== MaSanPham);

                        localStorage.setItem('cart', JSON.stringify(cart));
                        this.cartUpdated.next();
                    }
                });
            }
        });
    }

    //Xoá toàn bộ sản phẩm
    deleteAllGioHang = () => {
        Swal.fire({
            title: 'Thông báo',
            text: 'Bạn có chắc chắn muốn xóa toàn bộ sản phẩm khỏi giỏ hàng không?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Xoá'
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem('cart');

                Swal.fire({
                    title: 'Thông báo',
                    text: 'Tất cả sản phẩm đã được xoá khỏi giỏ hàng',
                    icon: 'success',
                    confirmButtonText: 'Đóng',
                    didClose: () => {
                        this.cartUpdated.next();
                    }
                });
            }
        });
    }
}