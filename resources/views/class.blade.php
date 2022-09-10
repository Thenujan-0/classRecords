@extends("layouts.app")

@section("head")
@vite(["resources/js/class/class.js"])

@section("content")
<div class="container d-flex align-items-center justify-content-center">
    <div class="card p-4 container" style="width:-fit-content;">
        <div class="card-body d-flex flex-column align-items-center" style="width:-fit-content;">
            <div class="class-header d-flex align-items-center mb-5 justify-content-between">
                <h3 class="card-title mx-1">{{$class->name}}</h3>
                <div class="btn" id="btnClassMenu">
                    <i class="fa-solid fa-bars"></i>
                </div>
            </div>
            <p class="fs-5">Current class count : <span id="currClassCount"></span></p>
            <p class="fs-5">Last final class : <span id="finClassCount"></span></p>


            {{-- <div class="records overflow-auto" style="max-height:60vh">
                @foreach($records as $record)
                    <div class="list-item d-flex align-items-center py-2 px-3  ms-0 m-1 border rounded" style="width:fit-content">
                        <p class="dateItem m-0">{{$record->date}}</p>
                        <i class="trashBtn fa-solid fa-trash ms-3" style="color:#ff4444;" role='button' data-id="{{$record->id}}"></i> 
                        
                    </div>
                    
                @endforeach
                @empty($records)
                No records
                @endempty
            </div> --}}
            <p class="lastDate" style="display: none">{{$lastRecord}}</p>
            {{-- <div class="input">
                <input type="checkbox" name="showAllRecords" id="showAllRecords">
                <label for="#showAllRecords">Show all records</label>
            </div> --}}
            {{-- <button class="btn btn-primary mt-3 btnAdd" data-bs-toggle="modal" data-bs-target="#addRecordFormModal">Add</button> --}}

            <div class="calendar mb-5 mt-4 p-3 border rounded bg-light">
                <style>
                    .calendar .dateItem{
                        width:clamp(50px,8vw,70px);
                        height:clamp(50px,8vw,70px);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                </style>
                <div class="calendar-header position-relative mb-1">
                    <p class="calendar-year fs-5 mb-0 "></p>
                    <div class="month d-flex position-absolute top-50 start-50 translate-middle">
                        <button class="btn btnLeft "><i class="fa-solid fa-chevron-left"></i></button>
                        <p class="calendar-month fs-5 mb-0 mx-3"></p>
                        <button class="btn btnRight "><i class="fa-solid fa-chevron-right "></i></button>
                    </div>
                </div>
                <div class="calendar-days">
                    <div class="row p-3">
                        <div class="col-sm p-2 d-flex align-items-center justify-content-center">Sun</div>
                        <div class="col-sm p-2 d-flex align-items-center justify-content-center">Mon</div>
                        <div class="col-sm p-2 d-flex align-items-center justify-content-center">Tue</div>
                        <div class="col-sm p-2 d-flex align-items-center justify-content-center">Wed</div>
                        <div class="col-sm p-2 d-flex align-items-center justify-content-center">Thu</div>
                        <div class="col-sm p-2 d-flex align-items-center justify-content-center">Fri</div>
                        <div class="col-sm p-2 d-flex align-items-center justify-content-center">Sat</div>
                    </div>
                </div>
                <div class="calendar-body  border-rounded p-3 text-white">
                    
                </div>

            </div>
        </div>
    </div>
</div>

<div class="datePopup position-absolute  bg-white p-3 border rounded" style="display:none">
    <p class="classDate"></p>
    <div class="btn btn-danger mb-1">Delete</div>
    <div class="btn btn-primary">Add</div>
    <div class="btn btn-secondary btnFinalDate">Set as final class</div>
</div>

<div class="menuPopup position-absolute  bg-white p-3 border rounded" style="display:none">
    <div class="btn btn-danger">Delete Class</div>
</div>



@endsection

@section("sideContent")
    @include("includes.addRecordForm")
    {{-- <div class="darkOverlay vw-100 vh-100 bg-dark position-absolute top-0 opacity-25 zindex-fixed" ></div> --}}
@endsection