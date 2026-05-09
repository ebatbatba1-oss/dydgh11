document.addEventListener('DOMContentLoaded', () => {
    const designRadios = document.querySelectorAll('input[name="design"]');
    const bgImage = document.getElementById('card-bg');
    const cardWrap = document.getElementById('card-wrap');
    
    const detailLabel = document.getElementById('detail-label');
    const detailInput = document.getElementById('detail-input');

    const photoUpload = document.getElementById('photo-upload');
    const uploadedPhoto = document.getElementById('uploaded-photo');
    const photoPlaceholder = document.getElementById('photo-placeholder');

    const nameInput = document.getElementById('name-input');
    const displayName = document.getElementById('display-name');
    const displayDetail = document.getElementById('display-detail');

    const downloadBtn = document.getElementById('download-btn');

    // 1. 디자인 선택 시 배경 및 플레이스홀더 변경
    designRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            if (e.target.value === 'design1') {
                bgImage.src = 'design1.png';
                cardWrap.className = 'theme-design1';
                detailLabel.textContent = '체급 (복서)';
                detailInput.placeholder = '플라이급 / 밴텀급 / 라이트급 / 웰터급 / 미들급 / 헤비급';
            } else {
                bgImage.src = 'design2.png';
                cardWrap.className = 'theme-design2';
                detailLabel.textContent = '포지션 (페어)';
                detailInput.placeholder = '바디 컨디셔너 / 페이스메이커';
            }
        });
    });

    // 2. 사진 업로드 시 미리보기
    photoUpload.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                uploadedPhoto.src = event.target.result;
                uploadedPhoto.style.display = 'block';
                photoPlaceholder.style.display = 'none'; 
            }
            reader.readAsDataURL(file);
        }
    });

    // 3. 텍스트 실시간 출력
    nameInput.addEventListener('input', (e) => {
        displayName.textContent = e.target.value;
    });

    detailInput.addEventListener('input', (e) => {
        displayDetail.textContent = e.target.value;
    });

    // 4. 다운로드 기능
    downloadBtn.addEventListener('click', () => {
        html2canvas(cardWrap, {
            scale: 3, 
            useCORS: true,
            backgroundColor: null
        }).then(canvas => {
            const link = document.createElement('a');
            link.download = 'Yongho_Boxing_Gym_Card.png';
            link.href = canvas.toDataURL('image/png');
            link.click();
        });
    });
});
