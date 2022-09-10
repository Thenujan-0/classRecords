@extends("layouts.app")

@section("head")
@vite(["resources/sass/index.scss","resources/js/index.js"])
@endsection

@section("content")
<div class="container">
    <div class="classes d-flex flex-wrap">
        @foreach ($classes as $class)
            <div class="card m-3 " role='button' data-redirect={{$class->id}}>
                <div class="card-body">
                    <h5 class="card-title">{{$class->name}}</h5>
                    <div class="d-flex justify-content-between align-items-center">
                        <p class="card-text mb-0 me-4">{{$class->classCount()}}</p>
                        <p class="card-text">{{$class->lastDate()}}</p>
                    </div>
                </div>
            </div>
        @endforeach
    </div>

</div>
<div class="position-absolute btn btn-primary m-4 end-0 bottom-0 rounded-circle py-3 shadow" data-bs-toggle="modal" data-bs-target="#createClassModal">Add</div>

<div class="modal fade" id="createClassModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-body d-flex flex-column align-items-center">
                <p class="text-center">Enter name for the class</p>
                <div class="input-group">
                    <input class="w-100" type="text" name="className" id="classNameInput">
                </div>
                <div>
                    <button class="btn btn-primary mt-4" id="btnCreateClass">Create</button>
                </div>
            </div>
        </div>
    </div>
</div>


@endsection