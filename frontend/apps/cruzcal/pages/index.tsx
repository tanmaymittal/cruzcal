import {DropDown} from '../app/drop-down/drop-down'; // TODO: a

export function Index() {
  return (
    <>
      <div className="flex justify-center items-center">
        <h1 className="font-bold text-5xl mb-2">CruzCal</h1>
      </div>

      <div className="flex justify-center items-center">
        <p className="font-bold text-xl mb-2">All your classes. One calendar file.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2">
        <div>
            <div className="flex space-x-4">
              {/* TODO: 1) Fix orientation for all dropdowns */}

              <DropDown name="Term" items={["2022 Summer" ,"2022 Fall"]} />
              {/* <DropDown name="Subject" items={["Math" ,"Art"]} /> */}
              {/* <DropDown name="Class Number" items={["01" ,"02"]} /> */}

            </div>

            {/* TODO: Create info pane component */}
            <div>Info Pane</div>
            <div className="flex">
              {/* TODO: Create button components */}
              <button className="">Reset</button>
              <button className="">Add</button>
            </div>
        </div>
      </div>

      <p className="text-center text-gray-500 text-xs">
        &copy;2022 CruzCal. All rights reserved.
      </p>

    </>
  );
}

export default Index;
