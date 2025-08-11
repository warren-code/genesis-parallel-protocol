import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function MemberDirectory() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    const { data, error } = await supabase.from('users').select('id, full_name, email, role');
    if (error) console.error(error);
    else setMembers(data);
  };

  return (
    <div>
      <h1>Member Directory</h1>
      <ul>
        {members.map((member) => (
          <li key={member.id}>{member.full_name} - {member.role}</li>
        ))}
      </ul>
    </div>
  );
}
