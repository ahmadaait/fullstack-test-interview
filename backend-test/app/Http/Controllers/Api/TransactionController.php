<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\TransactionResource;
use App\Models\Product;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Validator;

class TransactionController extends Controller
{
    public function index()
    {
        //get transactions
        $transactions = Transaction::with('product')->when(request()->q, function ($transactions) {
            $transactions = $transactions->where('reference_no', 'like', '%' . request()->q . '%');
        })->latest()->paginate(5);

        //return with Api Resource
        return new TransactionResource(true, 'List Data Transactions', $transactions);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'quantity' => 'required|min:1',
            'product_id' => 'required',
        ]);

        $product = Product::whereId($request->product_id)->first();

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $endPoint = "https://pay.saebo.id/test-dau/api/v1/transactions";
        $jsonResponse = json_decode(
            Http::withHeaders(['x-api-key' => 'DATAUTAMA'])->post($endPoint, [
                'quantity' => $request->quantity,
                'price' => $product->price,
                'payment_amount' => $product->price * $request->quantity,
            ])
        );

        $getRefNo = $jsonResponse->data;

        if ($request->quantity > $product->stock) {
            return response()->json(["message" => "Quantity melebihi stok!"], 422);
        }

        $transaction = Transaction::create([
            'reference_no' => $getRefNo->reference_no,
            'quantity' => $request->quantity,
            'price' => $product->price,
            'stock' => $product->stock - $request->quantity,
            'product_id' => $request->product_id,
            'payment_amount' => $product->price * $request->quantity
        ]);


        if ($transaction) {
            //return success with Api Resource
            return new TransactionResource(true, 'Data Transaction Berhasil Disimpan!', $transaction);
        }

        //return failed with Api Resource
        return new TransactionResource(false, 'Data Transaction Gagal Disimpan!', null);
    }


    public function show($id)
    {
        $transaction = Transaction::whereId($id)->first();
        if ($transaction) {
            //return success with Api Resource
            return new TransactionResource(true, 'Detail Data Transaction!', $transaction);
        }

        //return failed with Api Resource
        return new TransactionResource(false, 'Detail Data Transaction Tidak Ditemukan!', null);
    }
}
