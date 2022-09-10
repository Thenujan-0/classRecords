<div class="modal fade" id="addRecordFormModal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered" style="width:fit-content">
        <div class="modal-content m-0" style="width:fit-content">
            <div class="modal-header">
                <h4 class="modal-title">Create a record</h4>
            </div>
            <form action="/addRecord" method="POST" id="addRecordForm" class=" d-flex align-items-start
                flex-column bg-light border border-rounded p-5 m-0" style="width:fit-content">
            @csrf

            <input type="number" name="class_id" hidden value="{{$class->id}}">

            <div class="input m-1 ">
                <label for="addRecord-dateInput">Date</label>
                <div class="input-group" >
                    <input type="date"  name="date" class="form-control" id="addRecord-dateInput">
                </div>
                <p id="date-error" class="inline-error" style="visibility: hidden"></p>

                <div class="input-group">
                    <input class="me-1" type="checkbox" name="allowSameDate" id="cBoxAllowSameDate">
                    <label class="" for="cBoxAllowSameDate">Allow multiple records on same date</label>
                </div>
            </div>
            <input type="submit" class="btn btn-primary mt-3 btnCreate" value="Create">

            @vite("resources/js/class/addRecordForm.js")

            </form>
        </div>
    </div>
</div>