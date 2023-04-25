import React, { useEffect, useState } from "react";
import AuthLayout from "../../layout/AuthLayout";
import "./Subject.css";
import { request } from "../../utils/request";

function Subject() {
  const [subjects, setSubjects] = useState([]);

  const getSubjects = async () => {
    await request.get('/get_all_subject').then((res) => {
      setSubjects(res.data)
    });
  }

  useEffect(() => {
    getSubjects()
  }, [])

  return (
    <AuthLayout>
      <div className="subject-noti">
        <div className="container">
          <div className="row">
            {subjects.map((subject) => (
              <div className="col-sm-4" key={subject.subject?.id}>
                <button type="button" className="btn btn-danger">
                  {subject.subject?.name}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}

export default Subject;
